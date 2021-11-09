import request from 'supertest';
import App from '@src/app';
import printError from '../../../utils/print-error';

const { express } = new App();

describe('Create Account', () => {
  test('createAccount should response successful', async () => {
    delete process.env.HASH_SALT;
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation createAccount($accountInput: CreateAccountInput!) {
            createAccount(accountInput: $accountInput) {
              id
              name
              email
              photoPath
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          accountInput: {
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'john123',
          },
        },
      })
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.createAccount).toStrictEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john@doe.com',
      photoPath: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('createAccount with invalid email should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation createAccount($accountInput: CreateAccountInput!) {
          createAccount(accountInput: $accountInput) {
            id
          }
        }
      `,
        variables: {
          accountInput: {
            name: 'John Doe',
            email: 'johndoe.com',
            password: 'john123',
          },
        },
      })
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(response.status).toEqual(400);
    expect(error).toHaveProperty('message');
    expect(error.message).toContain('accountInput.email');
    expect(error.message).toContain('Expected type');
    expect(error.extensions.code).toEqual('BAD_USER_INPUT');
  });

  test('createAccount with duplicated email should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation createAccount($accountInput: CreateAccountInput!) {
          createAccount(accountInput: $accountInput) {
            id
          }
        }
      `,
        variables: {
          accountInput: {
            name: 'Will Doe',
            email: 'william@example.com',
            password: 'will123',
          },
        },
      })
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('column email (william@example.com) already exists');
    expect(error.extensions.code).toEqual('ACCOUNTS_EMAIL_UNIQUE');
  });
});
