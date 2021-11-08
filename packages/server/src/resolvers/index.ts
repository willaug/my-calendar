import accounts from './accounts';
import helloWorld from './hello-world';
import scalarTypes from './scalar-types';

const resolvers = {
  ...scalarTypes,
  ...accounts,
  ...helloWorld,
};

export default resolvers;
