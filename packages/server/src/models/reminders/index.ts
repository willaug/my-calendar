import { Reminders, ReminderSnackCase } from '@core/interfaces/index';
import { ApolloError } from 'apollo-server-express';
import myCalendarDatabase from '@core/database';
import { Knex } from 'knex';
import moment from 'moment';

import RemindersMapper from './mapper';

function scheduledToIsBeforeNow(scheduledTo: string): boolean {
  return moment(scheduledTo).isBefore(moment());
}

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

  public async createReminder({ createReminderInput, authAccount }): Promise<ReminderSnackCase> {
    if (scheduledToIsBeforeNow(createReminderInput.scheduledTo)) {
      throw new ApolloError(
        'scheduledTo is before now',
        'SCHEDULED_TO_IS_BEFORE_NOW',
      );
    }

    const [response] = await this.database<ReminderSnackCase>('reminders')
      .insert(RemindersMapper.toCreateReminder({
        reminder: createReminderInput,
        accountId: authAccount.account_id,
      }))
      .returning('*');

    return response;
  }

  public async updateReminder({ updateReminderInput, authAccount }): Promise<ReminderSnackCase> {
    if (updateReminderInput.scheduledTo && scheduledToIsBeforeNow(updateReminderInput.scheduledTo)) {
      throw new ApolloError(
        'scheduledTo is before now',
        'SCHEDULED_TO_IS_BEFORE_NOW',
      );
    }

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
