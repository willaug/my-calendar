import remindersNotification from '@core/functions/emails/reminders-notification';

describe('RemindersNotification', () => {
  test('RemindersNotification function should return successful', async () => {
    const response = await remindersNotification();
    expect(response).toStrictEqual({
      message: 'success',
      remindersCalled: 3,
    });
  });
});
