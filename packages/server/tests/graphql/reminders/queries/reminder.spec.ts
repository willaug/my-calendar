import { correctWillDoeToken } from '@tests/utils/create-token';
import printError from '@tests/utils/print-error';
import request from 'supertest';
import App from '@src/app';

const { express } = new App();

describe('Reminders', () => {
  test('reminders should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
        query reminders {
          reminders {
            results {
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
            totalCount
            limit
            offset
          }
        }
      `,
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    const {
      totalCount, limit, offset, results,
    } = response.body.data.reminders;

    expect(totalCount).toEqual(3);
    expect(limit).toEqual(10);
    expect(offset).toEqual(0);

    expect(results).toHaveLength(3);
    expect(results).toStrictEqual([
      {
        id: '4923e408-b524-5e35-8dd7-bb55a296ca82',
        title: 'Comprar pão',
        repeat: true,
        fullDay: false,
        archived: true,
        remembered: false,
        scheduledTo: expect.any(String),
        description: null,
        rememberEmail: true,
        reminderColor: '#548790',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: 'c646fd10-9953-5bd7-8005-d5e122a963f8',
        title: 'Consulta médica',
        repeat: false,
        fullDay: true,
        archived: false,
        remembered: false,
        scheduledTo: expect.any(String),
        description: null,
        rememberEmail: false,
        reminderColor: '#465FDB',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: 'c4ce88bc-186e-5219-a930-4189b76a7713',
        title: 'Consulta odontológica',
        repeat: false,
        fullDay: true,
        archived: false,
        remembered: false,
        scheduledTo: expect.any(String),
        description: 'Consulta com o Dr. Silva',
        rememberEmail: false,
        reminderColor: '#9087e3',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });

  test('reminders with offset and limit should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          query reminders($queryRemindersInput: QueryRemindersInput) {
            reminders(queryRemindersInput: $queryRemindersInput) {
              results {
                id
              }
              totalCount
              limit
              offset
            }
          }
        `,
        variables: {
          queryRemindersInput: {
            limit: 70,
            offset: 10,
          },
        },
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    const {
      totalCount, limit, offset, results,
    } = response.body.data.reminders;

    expect(results).toHaveLength(0);
    expect(totalCount).toEqual(3);
    expect(offset).toEqual(10);
    expect(limit).toEqual(70);
  });

  test('reminders with orderBy should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          query reminders($queryRemindersInput: QueryRemindersInput) {
            reminders(queryRemindersInput: $queryRemindersInput) {
              results {
                title
              }
              totalCount
            }
          }
        `,
        variables: {
          queryRemindersInput: {
            orderBy: {
              orderColumn: 'title',
              orderDirection: 'desc',
            },
          },
        },
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    const { totalCount, results } = response.body.data.reminders;

    expect(totalCount).toEqual(3);
    expect(results).toHaveLength(3);
    expect(results).toStrictEqual([
      {
        title: 'Consulta odontológica',
      },
      {
        title: 'Consulta médica',
      },
      {
        title: 'Comprar pão',
      },
    ]);
  });

  test('reminders with where and orderBy should response successful', async () => {
    const response = await request(express)
      .post('/')
      .send({
        query: `#graphql
          query reminders($queryRemindersInput: QueryRemindersInput) {
            reminders(queryRemindersInput: $queryRemindersInput) {
              results {
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
              }
              totalCount
            }
          }
        `,
        variables: {
          queryRemindersInput: {
            where: {
              titleLike: 'Consulta',
              descriptionLike: 'Silva',
              scheduledToStart: '2021-01-10T07:17:36.000Z',
              scheduledToEnd: '2021-02-11T07:17:36.000Z',
              reminderColorIn: ['#9087e3'],
              rememberEmailEqual: false,
              repeatEqual: false,
              fullDayEqual: true,
              archivedEqual: false,
            },
            orderBy: {
              orderColumn: 'title',
              orderDirection: 'asc',
            },
          },
        },
      })
      .set('Authorization', correctWillDoeToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    const { totalCount, results } = response.body.data.reminders;

    expect(totalCount).toEqual(1);
    expect(results).toHaveLength(1);
    expect(results).toStrictEqual([
      {
        id: 'c4ce88bc-186e-5219-a930-4189b76a7713',
        title: 'Consulta odontológica',
        repeat: false,
        fullDay: true,
        archived: false,
        remembered: false,
        scheduledTo: '2021-02-10T07:17:36.000Z',
        description: 'Consulta com o Dr. Silva',
        rememberEmail: false,
        reminderColor: '#9087e3',
      },
    ]);
  });
});
