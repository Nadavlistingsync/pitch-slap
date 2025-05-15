import { prisma } from '../src/lib/db';

async function getDatabaseStats() {
  try {
    // Get table statistics
    const stats = await prisma.$queryRaw`
      SELECT 
        schemaname,
        relname as table_name,
        n_live_tup as row_count,
        pg_size_pretty(pg_total_relation_size(relid)) as total_size,
        pg_size_pretty(pg_relation_size(relid)) as table_size,
        pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) as index_size
      FROM pg_stat_user_tables
      ORDER BY pg_total_relation_size(relid) DESC;
    `;

    // Get index statistics
    const indexStats = await prisma.$queryRaw`
      SELECT 
        schemaname,
        tablename,
        indexname,
        pg_size_pretty(pg_relation_size(indexrelid)) as index_size,
        idx_scan as number_of_scans,
        idx_tup_read as tuples_read,
        idx_tup_fetch as tuples_fetched
      FROM pg_stat_user_indexes
      ORDER BY pg_relation_size(indexrelid) DESC;
    `;

    // Get cache hit ratio
    const cacheStats = await prisma.$queryRaw`
      SELECT 
        sum(heap_blks_read) as heap_read,
        sum(heap_blks_hit) as heap_hit,
        sum(idx_blks_read) as idx_read,
        sum(idx_blks_hit) as idx_hit,
        sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) as heap_hit_ratio,
        sum(idx_blks_hit) / (sum(idx_blks_hit) + sum(idx_blks_read)) as idx_hit_ratio
      FROM pg_statio_user_tables;
    `;

    console.log('Database Statistics:');
    console.log('===================');
    console.log('\nTable Statistics:');
    console.table(stats);
    
    console.log('\nIndex Statistics:');
    console.table(indexStats);
    
    console.log('\nCache Statistics:');
    console.table(cacheStats);

  } catch (error) {
    console.error('Error getting database stats:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getDatabaseStats(); 