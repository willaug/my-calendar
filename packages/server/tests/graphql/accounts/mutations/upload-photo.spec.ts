import { correctWillDoeToken } from '@tests/utils/create-token';
import printError from '@tests/utils/print-error';
import request from 'supertest';
import App from '@src/app';

const { express } = new App();

describe('Upload Photo of Account', () => {
  test('uploadPhotoAccount should response successful', async () => {
    const response = await request(express)
      .post('/')
      .field('operations', JSON.stringify({
        query: `#graphql
        mutation uploadPhotoAccount($photoAccountInput: Upload!) {
          uploadPhotoAccount(photoAccountInput: $photoAccountInput) {
            id
            photoPath
          }
        }
    `,
      }))
      .field('map', JSON.stringify({
        0: ['variables.photoAccountInput'],
      }))
      .attach('0', `${__dirname}/../../../utils/images/horse.jpg`)
      .set('Authorization', correctWillDoeToken)
      .set('Content-Type', 'multipart/form-data');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.uploadPhotoAccount).toStrictEqual({
      id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
      photoPath: expect.stringContaining(`${process.env.HOST_URL}/images/accounts/`),
    });
  });

  test('uploadPhotoAccount with photo account should response successful', async () => {
    const response = await request(express)
      .post('/')
      .field('operations', JSON.stringify({
        query: `#graphql
          mutation uploadPhotoAccount($photoAccountInput: Upload!) {
            uploadPhotoAccount(photoAccountInput: $photoAccountInput) {
              id
              photoPath
            }
          }
      `,
      }))
      .field('map', JSON.stringify({
        0: ['variables.photoAccountInput'],
      }))
      .attach('0', `${__dirname}/../../../utils/images/bread.jpg`)
      .set('Authorization', correctWillDoeToken)
      .set('Content-Type', 'multipart/form-data');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.uploadPhotoAccount).toStrictEqual({
      id: '20ee8046-d30e-511d-9fe1-f772f90a89c6',
      photoPath: expect.stringContaining(`${process.env.HOST_URL}/images/accounts/`),
    });
  });

  test('uploadPhotoAccount with invalid file format should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .field('operations', JSON.stringify({
        query: `#graphql
          mutation uploadPhotoAccount($photoAccountInput: Upload!) {
            uploadPhotoAccount(photoAccountInput: $photoAccountInput) {
              id
              photoPath
            }
          }
      `,
      }))
      .field('map', JSON.stringify({
        0: ['variables.photoAccountInput'],
      }))
      .attach('0', Buffer.from('*'), 'example.txt')
      .set('Authorization', correctWillDoeToken)
      .set('Content-Type', 'multipart/form-data');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('invalid photo format');
    expect(error.extensions.code).toEqual('INVALID_PHOTO_FORMAT');
  });

  test('uploadPhotoAccount with large file should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .field('operations', JSON.stringify({
        query: `#graphql
          mutation uploadPhotoAccount($photoAccountInput: Upload!) {
            uploadPhotoAccount(photoAccountInput: $photoAccountInput) {
              id
              photoPath
            }
          }
      `,
      }))
      .field('map', JSON.stringify({
        0: ['variables.photoAccountInput'],
      }))
      .attach('0', Buffer.alloc(3 * 1024 * 1024), 'example.png')
      .set('Authorization', correctWillDoeToken)
      .set('Content-Type', 'multipart/form-data');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('photo exceeds the maximum size of 2 mb');
    expect(error.extensions.code).toEqual('PHOTO_EXCEEDS_MAXIMUM_SIZE');
  });
});
