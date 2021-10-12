module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [[
    'module-resolver', {
      alias: {
        '@interfaces': './src/interfaces',
        '@configs': './src/configs',
        '@models': './src/models',
        '@schemas': './src/schemas',
        '@resolvers': './src/resolvers',
      },
    },
  ]],
};
