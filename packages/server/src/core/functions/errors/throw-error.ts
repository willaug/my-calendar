import { ApolloError } from 'apollo-server-express';

export default function throwError(err: any): void {
  if (err.detail && err.detail.includes('already exists')) {
    const parentheses = /[()]/;
    const column = err.detail.split(parentheses)[1];
    const columnValue = err.detail.split(parentheses)[3];

    throw new ApolloError(
      `column ${column} (${columnValue}) already exists`,
      err.constraint.toUpperCase(),
    );
  }

  throw new ApolloError(
    'an internal server error occurred',
    'INTERNAL_SERVER_ERROR',
  );
}
