import login from './login';
import accounts from './accounts';
import reminders from './reminders';
import passwordReset from './password-reset';
import scalarTypes from './scalar-types';

const resolvers = [
  login,
  accounts,
  reminders,
  scalarTypes,
  passwordReset,
];

export default resolvers;
