import { correctWillAugToken } from '@tests/utils/create-token';
import printError from '@tests/utils/print-error';
import { date } from 'faker';
import request from 'supertest';
import App from '@src/app';

const { express } = new App();

describe('Create Reminder', () => {
  test('createReminder should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation createReminder($createReminderInput: CreateReminderInput!) {
            createReminder(createReminderInput: $createReminderInput) {
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
          createReminderInput: {
            title: 'Consulta dermatológica',
            scheduledTo: date.future(),
            description: 'Consulta com o médico John Doe',
            reminderColor: '#876543',
            rememberEmail: true,
            fullDay: false,
          },
        },
      })
      .set('Authorization', correctWillAugToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.createReminder).toStrictEqual({
      id: expect.any(String),
      title: 'Consulta dermatológica',
      description: 'Consulta com o médico John Doe',
      scheduledTo: expect.any(String),
      repeat: false,
      fullDay: false,
      archived: false,
      remembered: false,
      rememberEmail: true,
      reminderColor: '#876543',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('createReminder with date scheduledTo past should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation createReminder($createReminderInput: CreateReminderInput!) {
            createReminder(createReminderInput: $createReminderInput) {
              id
            }
          }
        `,
        variables: {
          createReminderInput: {
            title: 'Consulta dermatológica',
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

  test('createReminder with invalid date should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation createReminder($createReminderInput: CreateReminderInput!) {
            createReminder(createReminderInput: $createReminderInput) {
              id
            }
          }
        `,
        variables: {
          createReminderInput: {
            title: 'Consulta dermatológica',
            scheduledTo: 'Bom dia',
          },
        },
      })
      .set('Authorization', correctWillAugToken)
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(response.status).toEqual(400);
    expect(error).toHaveProperty('message');
    expect(error.message).toContain('createReminderInput.scheduledTo');
    expect(error.message).toContain('Expected type');
    expect(error.extensions.code).toEqual('BAD_USER_INPUT');
  });

  test('createReminder with invalid hexadecimal color should response unsuccessful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          mutation createReminder($createReminderInput: CreateReminderInput!) {
            createReminder(createReminderInput: $createReminderInput) {
              id
            }
          }
        `,
        variables: {
          createReminderInput: {
            title: 'Consulta dermatológica',
            scheduledTo: date.future(),
            reminderColor: 'Olá',
          },
        },
      })
      .set('Authorization', correctWillAugToken)
      .set('Accept', 'application/json');

    const [error] = response.body.errors;

    expect(response.status).toEqual(400);
    expect(error).toHaveProperty('message');
    expect(error.message).toContain('createReminderInput.reminderColor');
    expect(error.message).toContain('Expected type');
    expect(error.extensions.code).toEqual('BAD_USER_INPUT');
  });
});
