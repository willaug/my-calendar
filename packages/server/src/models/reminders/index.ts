import { Reminders, ReminderSnakeCase } from '@core/interfaces/index';
import { ApolloError } from 'apollo-server-express';
import myCalendarDatabase from '@core/database';
import { Knex } from 'knex';

import RemindersMapper from './mapper';

class RemindersModel extends RemindersMapper {
  public database: Knex;

  public constructor() {
    super();
    this.database = myCalendarDatabase;
  }

  public async reminders({ queryRemindersInput, authAccount }): Promise<Reminders> {
    const {
      where, orderBy, limit, offset,
    } = queryRemindersInput;

    const query = this.database<ReminderSnakeCase>('reminders')
      .where('account_id', authAccount.account_id)
      .modify((queryBuilder: any) => {
        if (where) {
          queryBuilder.where((builder: any) => RemindersMapper.toQueryConditions(builder, where));
        }
      });

    const { count } = await query.clone().count().first();
    const results = await query
      .clone()
      .limit(limit || 10)
      .offset(offset || 0)
      .modify((builder: any) => {
        if (orderBy) {
          builder.orderBy(orderBy.orderColumn, orderBy.orderDirection);
        }
      });

    return {
      results,
      totalCount: Number(count),
      limit: limit || 10,
      offset: offset || 0,
    };
  }

  public async reminder({ queryReminderInput, authAccount }): Promise<ReminderSnakeCase> {
    const reminder = await this.database<ReminderSnakeCase>('reminders')
      .where('id', queryReminderInput)
      .andWhere('account_id', authAccount.account_id)
      .first();

    if (!reminder) {
      throw new ApolloError(
        'reminder not found',
        'REMINDER_NOT_FOUND',
      );
    }

    return reminder;
  }

  public async createReminder({ createReminderInput, authAccount }): Promise<ReminderSnakeCase> {
    const [response] = await this.database<ReminderSnakeCase>('reminders')
      .insert(RemindersMapper.toCreateReminder({
        reminder: createReminderInput,
        accountId: authAccount.account_id,
      }))
      .returning('*');

    return response;
  }

  public async updateReminder({ updateReminderInput, authAccount }): Promise<ReminderSnakeCase> {
    const [response] = await this.database<ReminderSnakeCase>('reminders')
      .update(RemindersMapper.toUpdateReminder(updateReminderInput))
      .where({
        id: updateReminderInput.id,
        account_id: authAccount.account_id,
      })
      .returning('*');

    return response;
  }
}

export default new RemindersModel();
