console.log('process.env.NODE_ENV', `[${process.env.NODE_ENV + ''}]`);

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: process.env.NODE_ENV + '' === 'test' ? 'cjs' : false
      }
    ],
    '@babel/preset-react'
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
          /* this is for tools like Jest */
          '~': '.',
          src: './src',
          components: './src/components'
        }
      }
    ]
  ]
};
