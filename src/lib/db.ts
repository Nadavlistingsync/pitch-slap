import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

// Create a connection pool for Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection
});

// Create a singleton instance of PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Add Neon-specific optimizations
  log: ['error', 'warn'],
  // Enable query caching
  __internal: {
    engine: {
      queryCache: true,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper function to execute raw queries with the pool
export async function executeQuery<T>(query: string, params?: any[]): Promise<T> {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows as T;
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

// Helper function to analyze query performance
export async function analyzeQuery(query: string, params?: any[]) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SET LOCAL enable_seqscan = off');
    const result = await client.query(`EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${query}`, params);
    await client.query('ROLLBACK');
    return result.rows[0];
  } finally {
    client.release();
  }
} 