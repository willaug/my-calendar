import formatError from '@core/functions/format-error';
import { GraphQLError } from 'graphql';

const err = {
  message: 'any error',
  extensions: {},
} as GraphQLError;

describe('FormatError', () => {
  test('FormatError function should new err', () => {
    const formatedError = formatError(err);

    expect(formatedError.message).toEqual('any error');
  });

  test('FormatError function should internal server err', () => {
    err.extensions.code = 'INTERNAL_SERVER_ERROR';
    const formatedError = formatError(err);

    expect(formatedError.message).toEqual('An internal server error occurred');
    expect(formatedError.extensions.code).toEqual('INTERNAL_SERVER_ERROR');
  });
});
