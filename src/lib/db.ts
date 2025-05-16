import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

// Create a connection pool for Neon with optimized settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Reduced from 20 to prevent connection exhaustion
  idleTimeoutMillis: 60000, // Increased idle timeout
  connectionTimeoutMillis: 5000, // Increased connection timeout
  application_name: 'pitch-slap', // Add application name for monitoring
  statement_timeout: 30000, // Add statement timeout
});

// Add pool error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Create a singleton instance of PrismaClient with optimized settings
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['error', 'warn'],
  // Add connection pool settings
  connectionLimit: 10,
  pool: {
    min: 2,
    max: 10,
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper function to execute raw queries with the pool and retry logic
export async function executeQuery<T>(query: string, params?: any[], retries = 3): Promise<T> {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows as T;
  } catch (error) {
    if (retries > 0 && error instanceof Error && error.message.includes('connection')) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return executeQuery(query, params, retries - 1);
    }
    throw error;
  } finally {
    client.release();
  }
}

// Helper function to get database stats
export async function getDatabaseStats() {
  const stats = await executeQuery(`
    SELECT 
      schemaname, 
      relname, 
      n_live_tup,
      n_dead_tup,
      last_vacuum,
      last_autovacuum
    FROM pg_stat_user_tables
    ORDER BY n_dead_tup DESC;
  `);
  return stats;
}

// Helper function to analyze query performance with improved error handling
export async function analyzeQuery(query: string, params?: any[]) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SET LOCAL enable_seqscan = off');
    await client.query('SET LOCAL statement_timeout = 30000');
    const result = await client.query(`EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${query}`, params);
    await client.query('ROLLBACK');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
} 