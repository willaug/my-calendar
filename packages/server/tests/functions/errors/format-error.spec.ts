import formatError from '@core/functions/errors/format-error';
import { GraphQLError } from 'graphql';

const err = {
  message: 'any error',
  extensions: {},
} as GraphQLError;

describe('FormatError', () => {
  test('FormatError function should return unsuccessful', () => {
    const formatedError = formatError(err);

    expect(formatedError.message).toEqual('any error');
  });

  test('FormatError function should return internal server error', () => {
    err.extensions.code = 'INTERNAL_SERVER_ERROR';
    const formatedError = formatError(err);

    expect(formatedError.message).toEqual('an internal server error occurred');
    expect(formatedError.extensions.code).toEqual('INTERNAL_SERVER_ERROR');
  });
});
