import request from 'supertest';
import App from '../../src/app';

const { express } = new App();

describe('Query Hello World', () => {
  test('helloWorld should return welcome message', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          query {
            helloWorld {
              message
            }
          }
        `,
      })
      .set('Accept', 'application/json');

    expect(response.ok).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('helloWorld');
    expect(response.body.data.helloWorld).toHaveProperty('message');
    expect(response.body.data.helloWorld.message).toEqual('Hello, i am MyCalendar <3!');
  });
});
