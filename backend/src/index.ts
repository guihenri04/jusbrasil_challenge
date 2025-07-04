import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { SuggestionResolver } from './resolvers/SuggestionResolver';
import { DatabaseService } from './services/DatabaseService';

async function startServer() {
  try {
    // Inicializar conexão com o banco
    await DatabaseService.initialize();
    console.log('📊 Conexão com banco de dados estabelecida');

    // Criar schema GraphQL
    const schema = await buildSchema({
      resolvers: [SuggestionResolver],
      validate: false,
    });

    // Criar servidor Apollo
    const server = new ApolloServer({
      schema,
      introspection: true,
    });

    await server.start();
    console.log('🚀 Servidor Apollo iniciado');

    // Criar app Express
    const app = express();

    // Configurar CORS
    app.use(cors({
      origin: ['http://localhost:3000', 'http://frontend:3000'],
      credentials: true,
    }));

    app.use(express.json());

    // Middleware GraphQL
    app.use('/graphql', expressMiddleware(server));

    // Endpoint de health check
    app.get('/health', (req: express.Request, res: express.Response) => {
      res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });

    const PORT = process.env.PORT || 4000;
    
    app.listen(PORT, () => {
      console.log(`🎯 Servidor rodando em http://localhost:${PORT}`);
      console.log(`📊 GraphQL Playground disponível em http://localhost:${PORT}/graphql`);
    });

  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:', error);
    process.exit(1);
  }
}

// Graceful shutdown para encerrar a conexão com o banco de forma segura
process.on('SIGTERM', async () => {
  console.log('📤 Encerrando servidor...');
  await DatabaseService.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('📤 Encerrando servidor...');
  await DatabaseService.close();
  process.exit(0);
});

startServer(); 