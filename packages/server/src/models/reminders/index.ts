import { Reminders, ReminderSnackCase } from '@core/interfaces/index';
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

    const query = this.database<ReminderSnackCase>('reminders')
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

  public async reminder({ queryReminderInput, authAccount }): Promise<ReminderSnackCase> {
    return this.database<ReminderSnackCase>('reminders')
      .where('id', queryReminderInput)
      .andWhere('account_id', authAccount.account_id)
      .first();
  }

  public async createReminder({ createReminderInput, authAccount }): Promise<ReminderSnackCase> {
    const [response] = await this.database<ReminderSnackCase>('reminders')
      .insert(RemindersMapper.toCreateReminder({
        reminder: createReminderInput,
        accountId: authAccount.account_id,
      }))
      .returning('*');

    return response;
  }

  public async updateReminder({ updateReminderInput, authAccount }): Promise<ReminderSnackCase> {
    const [response] = await this.database<ReminderSnackCase>('reminders')
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
