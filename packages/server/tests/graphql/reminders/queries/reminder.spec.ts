import { correctWillDoeToken } from '@tests/utils/create-token';
import printError from '@tests/utils/print-error';
import request from 'supertest';
import App from '@src/app';

const { express } = new App();

describe('Reminder', () => {
  test('reminder should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          query reminder($queryReminderInput: ID!) {
            reminder(queryReminderInput: $queryReminderInput) {
              id
              title
              repeat
              fullDay
              archived
              remembered
              scheduledTo
              description
              rememberEmail
              reminderColor
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          queryReminderInput: '4923e408-b524-5e35-8dd7-bb55a296ca82',
        },
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.reminder).toStrictEqual({
      id: '4923e408-b524-5e35-8dd7-bb55a296ca82',
      title: 'Comprar pão',
      repeat: 'everyMonday',
      fullDay: false,
      archived: true,
      remembered: false,
      scheduledTo: expect.any(String),
      description: null,
      rememberEmail: true,
      reminderColor: '#548790',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('reminder with non-existent id should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          query reminder($queryReminderInput: ID!) {
            reminder(queryReminderInput: $queryReminderInput) {
              id
            }
          }
        `,
        variables: {
          queryReminderInput: 'a9bbd54b-0db5-5a0f-b7a2-2b4ff74c7e24',
        },
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('reminder not found');
    expect(error.extensions.code).toEqual('REMINDER_NOT_FOUND');
  });
});
