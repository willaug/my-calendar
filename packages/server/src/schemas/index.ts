import { mergeTypeDefs } from '@graphql-tools/merge';

import scalarTypes from './scalar-types';
import helloWorld from './hello-world';
// import accounts from './accounts';

const types = mergeTypeDefs([
  helloWorld,
  scalarTypes,
  // accounts,
]);

export default types;
