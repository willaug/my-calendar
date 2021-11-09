import throwError from '@core/errors/throw-error';

test('ThrowError function should new err', () => {
  expect(() => throwError('Error!', {})).toThrow('Error!');
});
