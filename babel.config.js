module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    //'@babel/plugin-transform-runtime',
    //"@babel/plugin-syntax-dynamic-import",
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        root: ['./src'],
        alias: {
          /* this is for Jest */
          root: '.',
          src: './src',
          components: './src/components',
        },
      },
    ],
  ],
};
