const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    const testsArray = Array.from(tests);

    const graphqlTests = testsArray.filter((test) => test.path.includes('/graphql/')).sort();
    const functionsTests = testsArray.filter((test) => test.path.includes('/functions/')).sort();
    const apisTests = testsArray.filter((test) => test.path.includes('/api/')).sort();

    return apisTests.concat(functionsTests, graphqlTests);
  }
}

module.exports = CustomSequencer;
