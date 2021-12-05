import request from 'supertest';
import App from '@src/app';
import validator from 'validator';
import printError from '@tests/utils/print-error';

const { express } = new App();

describe('Login', () => {
  test('login should response successful', async () => {
    delete process.env.ACCESS_AUTH_TOKEN;
    delete process.env.EXPIRATION_AUTH_TOKEN;

    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation login($loginInput: LoginInput!) {
            login(loginInput: $loginInput) {
              token
            }
          }
        `,
        variables: {
          loginInput: {
            email: 'william@example.com',
            password: '1234',
          },
        },
      })
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.login).toHaveProperty('token');
    expect(validator.isJWT(response.body.data.login.token)).toBe(true);
    expect(response.body.data.login.token).toEqual(expect.any(String));
  });

  test('login with non existent user should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation login($loginInput: LoginInput!) {
            login(loginInput: $loginInput) {
              token
            }
          }
        `,
        variables: {
          loginInput: {
            email: 'william@example.org.br',
            password: '1234',
          },
        },
      })
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('The email or password is incorrect');
    expect(error.extensions.code).toEqual('EMAIL_OR_PASSWORD_INCORRECT');
  });

  test('login with invalid password should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation login($loginInput: LoginInput!) {
            login(loginInput: $loginInput) {
              token
            }
          }
        `,
        variables: {
          loginInput: {
            email: 'william@example.com',
            password: '12345678',
          },
        },
      })
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('The email or password is incorrect');
    expect(error.extensions.code).toEqual('EMAIL_OR_PASSWORD_INCORRECT');
  });
});
