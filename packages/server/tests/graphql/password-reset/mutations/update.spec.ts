import request from 'supertest';
import App from '@src/app';
import { internet } from 'faker';
import printError from '@tests/utils/print-error';

const { express } = new App();

describe('Update PasswordReset', () => {
  test('updatePasswordReset should response successful', async () => {
    delete process.env.HASH_SALT;
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
      mutation updatePasswordReset($passwordResetInput: UpdatePasswordResetInput!) {
        updatePasswordReset(passwordResetInput: $passwordResetInput) {
          message
        }
      }
    `,
        variables: {
          passwordResetInput: {
            token: 'xinFxacWT3VSu60MK45iN6gpLg3j3a',
            newPassword: '123456',
            confirmNewPassword: '123456',
            ip: internet.ip(),
          },
        },
      })
      .set('User-Agent', internet.userAgent())
      .set('Accept-Language', 'pt-BR,en;q=0.9,pt;q=0.8,fr;q=0.7')
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.updatePasswordReset).toStrictEqual({
      message: 'success',
    });
  });

  test('updatePasswordReset with expired token should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
      mutation updatePasswordReset($passwordResetInput: UpdatePasswordResetInput!) {
        updatePasswordReset(passwordResetInput: $passwordResetInput) {
          message
        }
      }
    `,
        variables: {
          passwordResetInput: {
            token: '3CkXFClH1GP6ewF',
            newPassword: '123456',
            confirmNewPassword: '123456',
            ip: internet.ip(),
          },
        },
      })
      .set('User-Agent', internet.userAgent())
      .set('Accept-Language', 'pt-BR,en;q=0.9,pt;q=0.8,fr;q=0.7')
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('password reset token expired');
    expect(error.extensions.code).toEqual('PASSWORD_RESET_TOKEN_EXPIRED');
  });

  test('updatePasswordReset with used token should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
      mutation updatePasswordReset($passwordResetInput: UpdatePasswordResetInput!) {
        updatePasswordReset(passwordResetInput: $passwordResetInput) {
          message
        }
      }
    `,
        variables: {
          passwordResetInput: {
            token: 'fuT1iU2hLxe9jJ0HN',
            newPassword: '123456',
            confirmNewPassword: '123456',
            ip: internet.ip(),
          },
        },
      })
      .set('User-Agent', internet.userAgent())
      .set('Accept-Language', 'pt-BR,en;q=0.9,pt;q=0.8,fr;q=0.7')
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('password reset token has already been used');
    expect(error.extensions.code).toEqual('PASSWORD_RESET_TOKEN_HAS_ALREADY_BEEN_USED');
  });

  test('updatePasswordReset without existent passwordReset should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
      mutation updatePasswordReset($passwordResetInput: UpdatePasswordResetInput!) {
        updatePasswordReset(passwordResetInput: $passwordResetInput) {
          message
        }
      }
    `,
        variables: {
          passwordResetInput: {
            token: '',
            newPassword: '123456',
            confirmNewPassword: '123456',
            ip: internet.ip(),
          },
        },
      })
      .set('User-Agent', internet.userAgent())
      .set('Accept-Language', 'pt-BR,en;q=0.9,pt;q=0.8,fr;q=0.7')
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('password reset token does not exist');
    expect(error.extensions.code).toEqual('PASSWORD_RESET_TOKEN_DOES_NOT_EXIST');
  });

  test('updatePasswordReset with newPassword diff from confirmNewPassword should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation updatePasswordReset($passwordResetInput: UpdatePasswordResetInput!) {
          updatePasswordReset(passwordResetInput: $passwordResetInput) {
            message
          }
        }
      `,
        variables: {
          passwordResetInput: {
            token: '',
            newPassword: '12345',
            confirmNewPassword: '123456',
            ip: internet.ip(),
          },
        },
      })
      .set('User-Agent', internet.userAgent())
      .set('Accept-Language', 'pt-BR,en;q=0.9,pt;q=0.8,fr;q=0.7')
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('Field newPassword is different from confirmNewPassword');
    expect(error.extensions.code).toEqual('BAD_USER_INPUT');
  });

  test('updatePasswordReset without header user-agent should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation updatePasswordReset($passwordResetInput: UpdatePasswordResetInput!) {
          updatePasswordReset(passwordResetInput: $passwordResetInput) {
            message
          }
        }
      `,
        variables: {
          passwordResetInput: {
            token: '',
            newPassword: '12345',
            confirmNewPassword: '123456',
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

  test('updatePasswordReset without header accept-language should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        mutation updatePasswordReset($passwordResetInput: UpdatePasswordResetInput!) {
          updatePasswordReset(passwordResetInput: $passwordResetInput) {
            message
          }
        }
      `,
        variables: {
          passwordResetInput: {
            token: '',
            newPassword: '12345',
            confirmNewPassword: '123456',
            ip: internet.ip(),
          },
        },
      })
      .set('User-Agent', internet.userAgent())
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('header accept-language not provided');
    expect(error.extensions.code).toEqual('ACCEPT_LANGUAGE_NOT_PROVIDED');
  });
});
