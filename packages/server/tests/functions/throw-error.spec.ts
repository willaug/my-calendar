import throwError from '@core/functions/throw-error';

test('ThrowError function should new err', () => {
  expect(() => throwError('Error!')).toThrow('Error!');
});
