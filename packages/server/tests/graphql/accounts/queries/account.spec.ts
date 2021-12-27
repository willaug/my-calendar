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
            reminders {
              id
              title
              description
              scheduledTo
              fullDay
              repeat
            }
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
      photoPath: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      reminders: [
        {
          id: '18f5b04a-631d-54bb-9839-aea9fa8079d0',
          title: 'Renovar passaporte',
          description: 'Lembrar de renovar!',
          scheduledTo: expect.any(String),
          fullDay: false,
          repeat: 'never',
        },
      ],
    });

    expect(moment(account.createdAt).isValid()).toBe(true);
    expect(moment(account.updatedAt).isValid()).toBe(true);
  });
});
