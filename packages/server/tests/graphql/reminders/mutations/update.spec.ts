import { correctWillAugToken } from '@tests/utils/create-token';
import printError from '@tests/utils/print-error';
import { date } from 'faker';
import request from 'supertest';
import App from '@src/app';

const { express } = new App();

describe('Update Reminder', () => {
  test('updateReminder should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation updateReminder($updateReminderInput: UpdateReminderInput!) {
            updateReminder(updateReminderInput: $updateReminderInput) {
              id
              title
              description
              scheduledTo
              repeat
              fullDay
              archived
              remembered
              rememberEmail
              reminderColor
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          updateReminderInput: {
            id: '18f5b04a-631d-54bb-9839-aea9fa8079d0',
            title: 'Retirar passaporte europeu',
            description: 'Retirar!',
            reminderColor: '#345678',
            archived: true,
          },
        },
      })
      .set('Authorization', correctWillAugToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.updateReminder).toStrictEqual({
      id: '18f5b04a-631d-54bb-9839-aea9fa8079d0',
      title: 'Retirar passaporte europeu',
      description: 'Retirar!',
      scheduledTo: expect.any(String),
      repeat: 'never',
      fullDay: false,
      archived: true,
      remembered: false,
      rememberEmail: false,
      reminderColor: '#345678',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('updateReminder with date scheduledTo past should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation updateReminder($updateReminderInput: UpdateReminderInput!) {
            updateReminder(updateReminderInput: $updateReminderInput) {
              id
            }
          }
        `,
        variables: {
          updateReminderInput: {
            id: '18f5b04a-631d-54bb-9839-aea9fa8079d0',
            scheduledTo: date.past(),
          },
        },
      })
      .set('Authorization', correctWillAugToken)
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(error).toHaveProperty('message');
    expect(error.message).toEqual('scheduledTo is before now');
    expect(error.extensions.code).toEqual('SCHEDULED_TO_IS_BEFORE_NOW');
  });
});
