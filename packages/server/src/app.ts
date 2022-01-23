import { ApolloServer, ExpressContext } from 'apollo-server-express';
import express, { Express } from 'express';
import dotEnv from 'dotenv';

import formatError from '@core/functions/errors/format-error';
import decodeToken from '@core/functions/token/decode-token';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphqlUploadExpress } from 'graphql-upload';
import authentication from '@directives/authentication';
import resolvers from './resolvers';
import typeDefs from './schemas';
import models from './models';

dotEnv.config();

class App {
  public express: Express;
  public readonly hostPort = Number(process.env.HOST_PORT) || 4000;
  public readonly host = process.env.HOST || `http://localhost:${this.hostPort}`;

  public constructor() {
    process.env.HOST_URL = this.host;
    this.express = express();
    this.createServer();
  }

  private async createServer(): Promise<void> {
    let schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    schema = authentication(schema);

    const server = new ApolloServer({
      schema,
      formatError,
      introspection: process.env.NODE_ENV !== 'production',
      context: async ({ req, res }: ExpressContext) => ({
        authAccount: await decodeToken({ req, res }),
        models,
        req,
      }),
    });

    await server.start();
    this.express.use(express.static('public'));
    this.express.use(graphqlUploadExpress());

    server.applyMiddleware({
      app: this.express,
      path: '/',
    });
  }
}

export default App;
