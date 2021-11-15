import accounts from './accounts';
import helloWorld from './hello-world';
import login from './login';
import scalarTypes from './scalar-types';

const resolvers = [
  scalarTypes,
  accounts,
  login,
  helloWorld,
];

export default resolvers;
