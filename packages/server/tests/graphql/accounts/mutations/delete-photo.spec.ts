import { correctWillDoeToken, correctWillIpsumToken } from '@tests/utils/create-token';
import printError from '@tests/utils/print-error';
import request from 'supertest';
import App from '@src/app';

const { express } = new App();

describe('Delete Photo of Account', () => {
  test('deletePhotoAccount should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation deletePhotoAccount {
            deletePhotoAccount {
              photoPath
            }
          }
      `,
      })
      .set('Authorization', correctWillIpsumToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.deletePhotoAccount.photoPath).toEqual(null);
  });

  test('deletePhotoAccount without photo should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation deletePhotoAccount {
            deletePhotoAccount {
              id
              photoPath
            }
          }
      `,
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('account has no image to delete');
    expect(error.extensions.code).toEqual('ACCOUNT_HAS_NO_IMAGE');
  });
});
