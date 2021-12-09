import throwError from '@core/functions/errors/throw-error';

test('ThrowError function should return unsuccessful', () => {
  expect(() => throwError('Error!')).toThrow('an internal server error occurred');
});
