import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { logger } from './logger';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Initialize Prisma client
let prisma: PrismaClient | null = null;

try {
  prisma = new PrismaClient();
  logger.info('Prisma client initialized successfully');
} catch (error) {
  logger.error('Failed to initialize Prisma client:', error);
  throw error;
}

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Helper function to execute raw queries with the pool and retry logic
export async function executeQuery<T>(query: string, params?: any[], retries = 3): Promise<T> {
  if (!pool) {
    throw new Error('Database connection not initialized');
  }

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

// Export prisma instance with type safety
export { prisma }; 