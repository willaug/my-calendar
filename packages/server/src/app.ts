import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotEnv from 'dotenv';

import formatError from '@core/functions/format-error';
import typeDefs from './schemas';
import resolvers from './resolvers';
import models from './models';

dotEnv.config();

class App {
  public express: Express;
  public readonly hostPort = Number(process.env.HOST_PORT) || 4000;
  public readonly host = process.env.HOST || `http://localhost:${this.hostPort}`;

  public constructor() {
    this.express = express();
    this.createServer();
  }

  private createServer(): void {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: process.env.ENVIRONMENT !== 'prod',
      formatError,
      context: () => ({
        models,
      }),
    });

    server.applyMiddleware({
      app: this.express,
      path: '/',
    });
  }
}

export default App;
