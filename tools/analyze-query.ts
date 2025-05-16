import { prisma } from '../src/lib/db';

async function analyzeQuery(query: string) {
  if (!prisma) {
    throw new Error('Database connection not initialized');
  }

  try {
    // Enable query analysis
    await prisma.$executeRaw`SET track_io_timing = ON`;
    
    // Get query plan
    const plan = await prisma.$queryRaw`
      EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${query}
    `;

    // Get query statistics
    const stats = await prisma.$queryRaw`
      SELECT 
        query,
        calls,
        total_time,
        mean_time,
        stddev_time,
        rows,
        shared_blks_hit,
        shared_blks_read,
        shared_blks_written,
        shared_blks_dirtied,
        temp_blks_read,
        temp_blks_written,
        blk_read_time,
        blk_write_time
      FROM pg_stat_statements
      WHERE query ILIKE ${`%${query}%`}
      ORDER BY total_time DESC
      LIMIT 1;
    `;

    console.log('Query Analysis:');
    console.log('==============');
    console.log('\nQuery Plan:');
    console.log(JSON.stringify(plan, null, 2));
    
    console.log('\nQuery Statistics:');
    console.table(stats);

  } catch (error) {
    console.error('Error analyzing query:', error);
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

// Example usage
const query = process.argv[2];
if (!query) {
  console.error('Please provide a query to analyze');
  process.exit(1);
}

analyzeQuery(query); 