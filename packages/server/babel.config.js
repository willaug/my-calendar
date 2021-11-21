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
        '@interfaces': './src/core/interfaces',
        '@core': './src/core',
        '@models': './src/models',
        '@schemas': './src/schemas',
        '@resolvers': './src/resolvers',
        '@middlewares': './src/middlewares',
        '@src': './src',
      },
    },
  ]],
};
