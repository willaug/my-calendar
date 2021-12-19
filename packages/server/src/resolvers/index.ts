import login from './login';
import accounts from './accounts';
import passwordReset from './password-reset';
import scalarTypes from './scalar-types';

const resolvers = [
  login,
  accounts,
  scalarTypes,
  passwordReset,
];

export default resolvers;
