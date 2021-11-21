import authentication from '@middlewares/authentication';
import { token, incorrectToken } from '../utils/create-token';

const params = {
  req: {
    headers: {
      authorization: `Bearer ${token}`,
    },
  },
};

describe('Authentication', () => {
  test('Authentication function should return successful', async () => {
    const authAccount = await authentication(params);

    expect(authAccount).toStrictEqual({
      id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
    });
  });

  test('Authentication function without authorization should return unsuccessful', async () => {
    expect(() => authentication({})).rejects.toThrow('Account not authenticated');
  });

  test('Authentication function without existing account should return unsuccessful', async () => {
    params.req.headers.authorization = `Bearer ${incorrectToken}`;
    const authAccount = (): any => authentication(params);

    expect(authAccount).rejects.toThrow('Account not authenticated');
  });
});
