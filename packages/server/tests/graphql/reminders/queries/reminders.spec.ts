import { correctWillIpsumToken } from '@tests/utils/create-token';
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
      .set('Authorization', correctWillIpsumToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    const {
      totalCount, limit, offset, results,
    } = response.body.data.reminders;

    expect(totalCount).toEqual(2);
    expect(limit).toEqual(10);
    expect(offset).toEqual(0);

    expect(results).toHaveLength(2);
    expect(results).toStrictEqual([
      {
        id: 'd65f3f61-cf10-584d-a192-7c3fdb51d270',
        title: 'Consulta médica',
        repeat: 'never',
        fullDay: true,
        archived: false,
        remembered: false,
        scheduledTo: expect.any(String),
        description: 'Consulta médica com o Dr. Marcos',
        rememberEmail: true,
        reminderColor: '#9087e3',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: '6057268e-f91f-5620-a474-4b30ab53a7a6',
        title: 'Pagamento de multa',
        repeat: 'never',
        fullDay: false,
        archived: false,
        remembered: true,
        scheduledTo: expect.any(String),
        description: null,
        rememberEmail: true,
        reminderColor: '#465FDB',
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
      .set('Authorization', correctWillIpsumToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    const {
      totalCount, limit, offset, results,
    } = response.body.data.reminders;

    expect(results).toHaveLength(0);
    expect(totalCount).toEqual(2);
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
              orderDirection: 'asc',
            },
          },
        },
      })
      .set('Authorization', correctWillIpsumToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    const { totalCount, results } = response.body.data.reminders;

    expect(totalCount).toEqual(2);
    expect(results).toHaveLength(2);
    expect(results).toStrictEqual([
      {
        title: 'Consulta médica',
      },
      {
        title: 'Pagamento de multa',
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
              }
              totalCount
            }
          }
        `,
        variables: {
          queryRemindersInput: {
            where: {
              titleLike: 'Consulta',
              descriptionLike: 'Marcos',
              scheduledToStart: '2021-01-10T07:17:36.000Z',
              scheduledToEnd: '2022-02-15T18:43:03.000Z',
              reminderColorIn: ['#9087e3'],
              rememberEmailEqual: true,
              repeatIn: ['never'],
              fullDayEqual: true,
              archivedEqual: false,
            },
            orderBy: {
              orderColumn: 'title',
              orderDirection: 'desc',
            },
          },
        },
      })
      .set('Authorization', correctWillIpsumToken)
      .set('Accept', 'application/json');

    printError(response);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    const { totalCount, results } = response.body.data.reminders;

    expect(totalCount).toEqual(1);
    expect(results).toHaveLength(1);
    expect(results).toStrictEqual([
      {
        id: 'd65f3f61-cf10-584d-a192-7c3fdb51d270',
        title: 'Consulta médica',
      },
    ]);
  });
});
