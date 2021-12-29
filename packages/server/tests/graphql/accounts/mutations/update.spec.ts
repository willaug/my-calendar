import printError from '@tests/utils/print-error';
import {
  correctWillDoeToken,
  incorrectTokenWithoutData,
  incorretWillAugToken,
} from '@tests/utils/create-token';
import request from 'supertest';
import moment from 'moment';
import App from '@src/app';

const { express } = new App();

describe('Update Account', () => {
  test('updateAccount should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation updateAccount($accountInput: UpdateAccountInput!) {
            updateAccount(accountInput: $accountInput) {
              id
              name
              email
              language
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          accountInput: {
            name: 'William',
            email: 'will@example.com.br',
            language: 'pt_br',
          },
        },
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    const { updateAccount } = response.body.data;
    expect(updateAccount).toStrictEqual({
      id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
      name: 'William',
      email: 'will@example.com.br',
      language: 'pt_br',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    expect(moment(updateAccount.updatedAt).isAfter(updateAccount.createdAt)).toBe(true);
  });

  test('updateAccount with duplicated email should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation updateAccount($accountInput: UpdateAccountInput!) {
          updateAccount(accountInput: $accountInput) {
            id
          }
        }
      `,
        variables: {
          accountInput: {
            email: 'william@example.com',
          },
        },
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('column email (william@example.com) already exists');
    expect(error.extensions.code).toEqual('ACCOUNTS_EMAIL_UNIQUE');
  });

  test('updateAccount without existent account should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation updateAccount($accountInput: UpdateAccountInput!) {
          updateAccount(accountInput: $accountInput) {
            id
          }
        }
      `,
        variables: {
          accountInput: {
            email: 'william@example.org.br',
          },
        },
      })
      .set('Authorization', incorretWillAugToken)
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('Account not authenticated');
    expect(error.extensions.code).toEqual('UNAUTHENTICATED');
  });

  test('updateAccount with incorrect token should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation updateAccount($accountInput: UpdateAccountInput!) {
          updateAccount(accountInput: $accountInput) {
            id
          }
        }
      `,
        variables: {
          accountInput: {
            email: 'william@example.org.br',
          },
        },
      })
      .set('Authorization', incorrectTokenWithoutData)
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('Account not authenticated');
    expect(error.extensions.code).toEqual('UNAUTHENTICATED');
  });

  test('updateAccount not authenticated should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation updateAccount($accountInput: UpdateAccountInput!) {
          updateAccount(accountInput: $accountInput) {
            id
          }
        }
      `,
        variables: {
          accountInput: {
            email: 'william@example.org',
          },
        },
      })
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('Account not authenticated');
    expect(error.extensions.code).toEqual('UNAUTHENTICATED');
  });
});
