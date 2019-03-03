module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        // targets: {
        //   node: '6.5' /* ES2016 compilation target */,
        // },
      },
    ],
    '@babel/preset-react',
  ],
  ignore: ['third_party'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    //'@babel/plugin-proposal-optional-chaining',
    //'@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    //'@babel/plugin-transform-runtime',
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
