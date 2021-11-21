import throwError from '@core/functions/errors/throw-error';

test('ThrowError function should return unsuccessful', () => {
  expect(() => throwError('Error!')).toThrow('An internal server error occurred');
});
