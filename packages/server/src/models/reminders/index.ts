import { ReminderSnackCase } from '@core/interfaces/index';
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
