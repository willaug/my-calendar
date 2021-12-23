import { correctWillAugToken } from '@tests/utils/create-token';
import printError from '@tests/utils/print-error';
import request from 'supertest';
import moment from 'moment';
import App from '@src/app';

const { express } = new App();

describe('Account', () => {
  test('account should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        query account {
          account {
            id
            name
            email
            photoPath
            createdAt
            updatedAt
          }
        }
      `,
      })
      .set('Authorization', correctWillAugToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    const { account } = response.body.data;
    expect(account).toStrictEqual({
      id: 'fbb537c1-359a-5c4c-84bc-9e82d5d8295a',
      name: 'William Augusto',
      email: 'william@example.com',
      photoPath: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    expect(moment(account.createdAt).isValid()).toBe(true);
    expect(moment(account.updatedAt).isValid()).toBe(true);
  });
});
