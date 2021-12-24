import { ReminderSnackCase } from '@core/interfaces/index';
import { ApolloError } from 'apollo-server-express';
import myCalendarDatabase from '@core/database';
import { Knex } from 'knex';
import moment from 'moment';

import RemindersMapper from './mapper';

class RemindersModel extends RemindersMapper {
  public database: Knex;

  public constructor() {
    super();
    this.database = myCalendarDatabase;
  }

  public async createReminder({ createReminderInput, authAccount }): Promise<ReminderSnackCase> {
    const scheduledToIsBeforeNow = moment(createReminderInput.scheduledTo).isBefore(moment());
    if (scheduledToIsBeforeNow) {
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
}

export default new RemindersModel();
