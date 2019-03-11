module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        // targets: {
        //   node: '6.5', /* ES2015 */
        // },
      },
    ],
    '@babel/preset-react',
  ],
  ignore: ['third_party'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
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
