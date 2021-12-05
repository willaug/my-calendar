import login from './login';
import accounts from './accounts';
import helloWorld from './hello-world';
import passwordReset from './password-reset';
import scalarTypes from './scalar-types';

const resolvers = [
  login,
  accounts,
  helloWorld,
  scalarTypes,
  passwordReset,
];

export default resolvers;
