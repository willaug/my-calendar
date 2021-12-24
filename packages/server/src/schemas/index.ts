import { mergeTypeDefs } from '@graphql-tools/merge';

import passwordReset from './password-reset';
import scalarTypes from './scalar-types';
import directives from './directives';
import reminders from './reminders';
import accounts from './accounts';
import login from './login';

const types = mergeTypeDefs([
  login,
  accounts,
  reminders,
  scalarTypes,
  passwordReset,
  directives,
]);

export default types;
