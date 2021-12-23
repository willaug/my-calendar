import { correctWillDoeToken } from '@tests/utils/create-token';
import printError from '@tests/utils/print-error';
import request from 'supertest';
import App from '@src/app';

const { express } = new App();

describe('Update Password of Account', () => {
  test('updatePassAccount should response successful', async () => {
    delete process.env.HASH_SALT;
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation updatePassAccount($passAccountInput: UpdatePassAccountInput!) {
            updatePassAccount(passAccountInput: $passAccountInput) {
              id
            }
          }
        `,
        variables: {
          passAccountInput: {
            currentPassword: 'example',
            newPassword: 'example2',
            confirmNewPassword: 'example2',
          },
        },
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    expect(response.body.data.updatePassAccount.id).toEqual('20ee8046-d30e-511d-9fe1-f772f90a89c6');
  });

  test('updatePassAccount with incorrect password should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation updatePassAccount($passAccountInput: UpdatePassAccountInput!) {
            updatePassAccount(passAccountInput: $passAccountInput) {
              id
            }
          }
        `,
        variables: {
          passAccountInput: {
            currentPassword: '2553055255',
            newPassword: 'example3',
            confirmNewPassword: 'example3',
          },
        },
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('the current password is incorrect');
    expect(error.extensions.code).toEqual('CURRENT_PASSWORD_INCORRECT');
  });

  test('updatePassAccount with newPassword diff from confirmNewPassword should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation updatePassAccount($passAccountInput: UpdatePassAccountInput!) {
            updatePassAccount(passAccountInput: $passAccountInput) {
              id
            }
          }
        `,
        variables: {
          passAccountInput: {
            currentPassword: 'example2',
            newPassword: 'example4',
            confirmNewPassword: 'example5',
          },
        },
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('field newPassword is different from confirmNewPassword');
    expect(error.extensions.code).toEqual('BAD_USER_INPUT');
  });
});
