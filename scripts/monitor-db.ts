import { prisma } from '../src/lib/db';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_KEY = 'db:performance:metrics';
const CACHE_TTL = 300; // 5 minutes

interface PerformanceMetrics {
  timestamp: number;
  slowQueries: Array<{
    query: string;
    calls: number;
    total_time: number;
    mean_time: number;
    rows: number;
  }>;
  cacheHitRatio: number;
  activeConnections: number;
  tableSizes: Array<{
    table_name: string;
    total_size: string;
    table_size: string;
    index_size: string;
  }>;
  indexUsage: Array<{
    schemaname: string;
    tablename: string;
    indexname: string;
    number_of_scans: number;
    tuples_read: number;
    tuples_fetched: number;
  }>;
}

async function collectMetrics(): Promise<PerformanceMetrics> {
  if (!prisma) {
    throw new Error('Database connection not initialized');
  }

  try {
    const [slowQueries, cacheStats, connections, tableSizes, indexUsage] = await Promise.all([
      prisma.$queryRaw<Array<{
        query: string;
        calls: number;
        total_time: number;
        mean_time: number;
        rows: number;
      }>>`
        SELECT 
          query,
          calls,
          total_time,
          mean_time,
          rows
        FROM pg_stat_statements
        WHERE mean_time > 1000
        ORDER BY mean_time DESC
        LIMIT 10;
      `,
      prisma.$queryRaw<Array<{ hit_ratio: number }>>`
        SELECT 
          sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) as hit_ratio
        FROM pg_statio_user_tables;
      `,
      prisma.$queryRaw<Array<{ active_connections: number }>>`
        SELECT count(*) as active_connections
        FROM pg_stat_activity
        WHERE state = 'active';
      `,
      prisma.$queryRaw<Array<{
        table_name: string;
        total_size: string;
        table_size: string;
        index_size: string;
      }>>`
        SELECT 
          relname as table_name,
          pg_size_pretty(pg_total_relation_size(relid)) as total_size,
          pg_size_pretty(pg_relation_size(relid)) as table_size,
          pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) as index_size
        FROM pg_stat_user_tables
        ORDER BY pg_total_relation_size(relid) DESC;
      `,
      prisma.$queryRaw<Array<{
        schemaname: string;
        tablename: string;
        indexname: string;
        number_of_scans: number;
        tuples_read: number;
        tuples_fetched: number;
      }>>`
        SELECT 
          schemaname,
          tablename,
          indexname,
          idx_scan as number_of_scans,
          idx_tup_read as tuples_read,
          idx_tup_fetch as tuples_fetched
        FROM pg_stat_user_indexes
        ORDER BY idx_scan DESC;
      `
    ]);

    return {
      timestamp: Date.now(),
      slowQueries,
      cacheHitRatio: cacheStats[0].hit_ratio,
      activeConnections: connections[0].active_connections,
      tableSizes,
      indexUsage,
    };
  } catch (error) {
    console.error('Error collecting metrics:', error);
    throw error;
  }
}

async function optimizeDatabase(metrics: PerformanceMetrics) {
  const issues = [];

  if (metrics.slowQueries.length > 0) {
    issues.push('\nSlow Queries Detected:');
    metrics.slowQueries.forEach(query => {
      issues.push(`\nQuery: ${query.query}`);
      issues.push(`Average Time: ${query.mean_time}ms`);
      issues.push(`Total Calls: ${query.calls}`);
      issues.push(`Rows Affected: ${query.rows}`);
    });
  }

  if (metrics.cacheHitRatio < 0.8) {
    issues.push('\nLow Cache Hit Ratio Detected:');
    issues.push(`Current Ratio: ${metrics.cacheHitRatio}`);
    issues.push('Consider increasing shared_buffers or work_mem');
  }

  const largeTables = metrics.tableSizes.filter(table => {
    const size = parseInt(table.total_size);
    return size > 1000000; // 1GB
  });

  if (largeTables.length > 0) {
    issues.push('\nLarge Tables Detected:');
    largeTables.forEach(table => {
      issues.push(`\nTable: ${table.table_name}`);
      issues.push(`Total Size: ${table.total_size}`);
      issues.push(`Table Size: ${table.table_size}`);
      issues.push(`Index Size: ${table.index_size}`);
    });
  }

  const unusedIndexes = metrics.indexUsage.filter(index => index.number_of_scans === 0);
  if (unusedIndexes.length > 0) {
    issues.push('\nUnused Indexes Detected:');
    unusedIndexes.forEach(index => {
      issues.push(`\nIndex: ${index.indexname}`);
      issues.push(`Table: ${index.tablename}`);
      issues.push(`Schema: ${index.schemaname}`);
    });
  }

  if (issues.length > 0) {
    console.log(issues.join('\n'));
  }
}

async function monitorDatabase() {
  try {
    const metrics = await collectMetrics();
    await redis.set(CACHE_KEY, JSON.stringify(metrics), { ex: CACHE_TTL });
    await optimizeDatabase(metrics);

    console.log('\nDatabase Performance Summary:');
    console.log('===========================');
    console.log(`Timestamp: ${new Date(metrics.timestamp).toISOString()}`);
    console.log(`Cache Hit Ratio: ${metrics.cacheHitRatio}`);
    console.log(`Active Connections: ${metrics.activeConnections}`);
    console.log(`Slow Queries: ${metrics.slowQueries.length}`);
    console.log(`Large Tables: ${metrics.tableSizes.filter(t => parseInt(t.total_size) > 1000000).length}`);
    console.log(`Unused Indexes: ${metrics.indexUsage.filter(i => i.number_of_scans === 0).length}`);

  } catch (error) {
    console.error('Error monitoring database:', error);
    process.exit(1);
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

monitorDatabase().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 