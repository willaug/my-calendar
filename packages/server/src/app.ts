import { ApolloServer, ExpressContext } from 'apollo-server-express';
import express, { Express } from 'express';
import dotEnv from 'dotenv';

import AuthenticationDirective from '@directives/authentication';
import formatError from '@core/functions/errors/format-error';
import decodeToken from '@core/functions/token/decode-token';
import resolvers from './resolvers';
import typeDefs from './schemas';
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
      formatError,
      introspection: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      context: async ({ req, res }: ExpressContext) => ({
        authAccount: await decodeToken({ req, res }),
        models,
        req,
      }),
      schemaDirectives: {
        authentication: AuthenticationDirective,
      },
    });

    server.applyMiddleware({
      app: this.express,
      path: '/',
    });
  }
}

export default App;
