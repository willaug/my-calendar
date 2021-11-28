import decodeToken from '@core/functions/decode-token';
import { correctTokenTypeOne, incorrectTokenTypeTwo } from '@tests/utils/create-token';

const req = {
  headers: {
    authorization: correctTokenTypeOne,
  },
};

describe('DecodeToken', () => {
  test('DecodeToken function should return successful', async () => {
    const response = await decodeToken({ req });

    expect(response).toStrictEqual({
      id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
    });
  });

  test('DecodeToken function without id into token should return unsuccessful', async () => {
    req.headers.authorization = incorrectTokenTypeTwo;
    const response = await decodeToken({ req });

    expect(response).toEqual(null);
  });

  test('DecodeToken function without token should return unsuccessful', async () => {
    delete req.headers;
    const response = await decodeToken({ req });

    expect(response).toEqual(null);
  });
});
