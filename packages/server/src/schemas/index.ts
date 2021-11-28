import { mergeTypeDefs } from '@graphql-tools/merge';

import scalarTypes from './scalar-types';
import helloWorld from './hello-world';
import directives from './directives';
import accounts from './accounts';
import login from './login';

const types = mergeTypeDefs([
  accounts,
  login,
  helloWorld,
  scalarTypes,
  directives,
]);

export default types;
