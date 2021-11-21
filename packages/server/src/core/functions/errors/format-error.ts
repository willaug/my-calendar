/* eslint no-param-reassign: ["error", { "props": false }] */
import { GraphQLError } from 'graphql';

export default function formatError(err: GraphQLError): GraphQLError {
  if (err.extensions && err.extensions.code === 'INTERNAL_SERVER_ERROR') {
    err.message = 'An internal server error occurred';
  }

  return err;
}
