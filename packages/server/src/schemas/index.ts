import { mergeTypeDefs } from '@graphql-tools/merge';

import passwordReset from './password-reset';
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
  passwordReset,
  directives,
]);

export default types;
