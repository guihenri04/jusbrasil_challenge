import { Pool, PoolClient } from 'pg';

export class DatabaseService {
  private static pool: Pool;

  static async initialize(): Promise<void> {
    const connectionString = process.env.DATABASE_URL || 
      'postgresql://autocomplete_user:autocomplete_pass@localhost:5432/autocomplete_db';

    this.pool = new Pool({
      connectionString,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Testar conexão
    try {
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      console.log('✅ Conexão com PostgreSQL estabelecida');
    } catch (error) {
      console.error('❌ Erro ao conectar com PostgreSQL:', error);
      throw error;
    }
  }

  static async query(text: string, params?: any[]): Promise<any> {
    const start = Date.now();
    try {
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;
      console.log(`🔍 Query executada em ${duration}ms: ${text.substring(0, 50)}...`);
      return result;
    } catch (error) {
      console.error('❌ Erro na query:', error);
      throw error;
    }
  }

  static async getClient(): Promise<PoolClient> {
    return this.pool.connect();
  }

  static async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      console.log('📦 Pool de conexões PostgreSQL fechado');
    }
  }
} 