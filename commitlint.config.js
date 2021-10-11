module.exports = {
  extends: ['gitmoji'],
  rules: {
    'header-max-length': [0, 'always', 100],
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['base', 'server', 'client']],
  },
}
