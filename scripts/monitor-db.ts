import { prisma } from '../src/lib/db';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_KEY = 'db:performance:metrics';
const CACHE_TTL = 300; // 5 minutes

interface SlowQuery {
  query: string;
  calls: number;
  total_time: number;
  mean_time: number;
  rows: number;
}

interface CacheStats {
  hit_ratio: number;
}

interface ConnectionStats {
  active_connections: number;
}

interface TableSize {
  table_name: string;
  total_size: string;
  table_size: string;
  index_size: string;
}

interface IndexUsage {
  schemaname: string;
  tablename: string;
  indexname: string;
  number_of_scans: number;
  tuples_read: number;
  tuples_fetched: number;
}

interface PerformanceMetrics {
  timestamp: number;
  slowQueries: SlowQuery[];
  cacheHitRatio: number;
  activeConnections: number;
  tableSizes: TableSize[];
  indexUsage: IndexUsage[];
}

async function collectMetrics(): Promise<PerformanceMetrics> {
  // Get slow queries
  const slowQueries = await prisma.$queryRaw<SlowQuery[]>`
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
  `;

  // Get cache hit ratio
  const cacheStats = await prisma.$queryRaw<CacheStats[]>`
    SELECT 
      sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) as hit_ratio
    FROM pg_statio_user_tables;
  `;

  // Get active connections
  const connections = await prisma.$queryRaw<ConnectionStats[]>`
    SELECT count(*) as active_connections
    FROM pg_stat_activity
    WHERE state = 'active';
  `;

  // Get table sizes
  const tableSizes = await prisma.$queryRaw<TableSize[]>`
    SELECT 
      relname as table_name,
      pg_size_pretty(pg_total_relation_size(relid)) as total_size,
      pg_size_pretty(pg_relation_size(relid)) as table_size,
      pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) as index_size
    FROM pg_stat_user_tables
    ORDER BY pg_total_relation_size(relid) DESC;
  `;

  // Get index usage
  const indexUsage = await prisma.$queryRaw<IndexUsage[]>`
    SELECT 
      schemaname,
      tablename,
      indexname,
      idx_scan as number_of_scans,
      idx_tup_read as tuples_read,
      idx_tup_fetch as tuples_fetched
    FROM pg_stat_user_indexes
    ORDER BY idx_scan DESC;
  `;

  return {
    timestamp: Date.now(),
    slowQueries,
    cacheHitRatio: cacheStats[0].hit_ratio,
    activeConnections: connections[0].active_connections,
    tableSizes,
    indexUsage,
  };
}

async function optimizeDatabase(metrics: PerformanceMetrics) {
  // Check for slow queries and suggest optimizations
  if (metrics.slowQueries.length > 0) {
    console.log('\nSlow Queries Detected:');
    metrics.slowQueries.forEach(query => {
      console.log(`\nQuery: ${query.query}`);
      console.log(`Average Time: ${query.mean_time}ms`);
      console.log(`Total Calls: ${query.calls}`);
      console.log(`Rows Affected: ${query.rows}`);
    });
  }

  // Check cache hit ratio
  if (metrics.cacheHitRatio < 0.8) {
    console.log('\nLow Cache Hit Ratio Detected:');
    console.log(`Current Ratio: ${metrics.cacheHitRatio}`);
    console.log('Consider increasing shared_buffers or work_mem');
  }

  // Check for large tables
  const largeTables = metrics.tableSizes.filter(table => {
    const size = parseInt(table.total_size);
    return size > 1000000; // 1GB
  });

  if (largeTables.length > 0) {
    console.log('\nLarge Tables Detected:');
    largeTables.forEach(table => {
      console.log(`\nTable: ${table.table_name}`);
      console.log(`Total Size: ${table.total_size}`);
      console.log(`Table Size: ${table.table_size}`);
      console.log(`Index Size: ${table.index_size}`);
    });
  }

  // Check for unused indexes
  const unusedIndexes = metrics.indexUsage.filter(index => index.number_of_scans === 0);
  if (unusedIndexes.length > 0) {
    console.log('\nUnused Indexes Detected:');
    unusedIndexes.forEach(index => {
      console.log(`\nIndex: ${index.indexname}`);
      console.log(`Table: ${index.tablename}`);
      console.log(`Schema: ${index.schemaname}`);
    });
  }
}

async function monitorDatabase() {
  try {
    // Collect metrics
    const metrics = await collectMetrics();

    // Cache metrics
    await redis.set(CACHE_KEY, JSON.stringify(metrics), { ex: CACHE_TTL });

    // Analyze and optimize
    await optimizeDatabase(metrics);

    // Log summary
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
  } finally {
    await prisma.$disconnect();
  }
}

// Run monitoring
monitorDatabase(); 