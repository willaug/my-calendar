import printError from '@tests/utils/print-error';
import { internet } from 'faker';
import request from 'supertest';
import App from '@src/app';

const { express } = new App();

describe('Create PasswordReset', () => {
  test('createPasswordReset without device information should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation createPasswordReset($passwordResetInput: CreatePasswordResetInput!) {
          createPasswordReset(passwordResetInput: $passwordResetInput) {
            message
          }
        }
      `,
        variables: {
          passwordResetInput: {
            email: 'william@example.com',
            ip: internet.ip(),
          },
        },
      })
      .set('User-Agent', 'Mozilla/5.0')
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.createPasswordReset).toStrictEqual({
      message: 'success',
    });
  });

  test('createPasswordReset using browser should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation createPasswordReset($passwordResetInput: CreatePasswordResetInput!) {
          createPasswordReset(passwordResetInput: $passwordResetInput) {
            message
          }
        }
      `,
        variables: {
          passwordResetInput: {
            email: 'william@example.com',
            ip: internet.ip(),
          },
        },
      })
      .set('User-Agent', 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 6.4; en) Opera 8.00')
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.createPasswordReset).toStrictEqual({
      message: 'success',
    });
  });

  test('createPasswordReset without existent account should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation createPasswordReset($passwordResetInput: CreatePasswordResetInput!) {
          createPasswordReset(passwordResetInput: $passwordResetInput) {
            message
          }
        }
      `,
        variables: {
          passwordResetInput: {
            email: 'william@example.org.br',
            ip: internet.ip(),
          },
        },
      })
      .set('User-Agent', internet.userAgent())
      .set('Accept-Language', 'en,pt-BR;q=0.9,pt;q=0.8,fr;q=0.7')
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('account does not exist');
    expect(error.extensions.code).toEqual('ACCOUNT_DOES_NOT_EXIST');
  });

  test('createPasswordReset with invalid ip should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation createPasswordReset($passwordResetInput: CreatePasswordResetInput!) {
          createPasswordReset(passwordResetInput: $passwordResetInput) {
            message
          }
        }
      `,
        variables: {
          passwordResetInput: {
            email: 'william@example.com',
            ip: 'BBB.DDD.4A.AAA',
          },
        },
      })
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toContain('passwordResetInput.ip');
    expect(error.message).toContain('Expected type');
    expect(error.extensions.code).toEqual('BAD_USER_INPUT');
  });

  test('createPasswordReset without header user-agent should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation createPasswordReset($passwordResetInput: CreatePasswordResetInput!) {
          createPasswordReset(passwordResetInput: $passwordResetInput) {
            message
          }
        }
      `,
        variables: {
          passwordResetInput: {
            email: 'william@example.com',
            ip: internet.ip(),
          },
        },
      })
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('header user-agent not provided');
    expect(error.extensions.code).toEqual('USER_AGENT_NOT_PROVIDED');
  });
});
