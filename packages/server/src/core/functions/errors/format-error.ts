/* eslint no-param-reassign: ["error", { "props": false }] */
import { GraphQLError } from 'graphql';

export default function formatError(err: GraphQLError): GraphQLError {
  if (err.extensions && err.extensions.code === 'INTERNAL_SERVER_ERROR') {
    err.message = 'an internal server error occurred';
  }

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'production') {
    delete err.extensions.exception;
  }

  return err;
}
