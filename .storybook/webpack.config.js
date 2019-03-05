// you can use this file to add your custom webpack plugins, loaders and
// anything you like. This is just the basic way to add additional webpack
// configurations. For more information refer the docs:
// https://storybook.js.org/configurations/custom-webpack-config IMPORTANT When
// you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const log = console.log;
const root = path.resolve(__dirname, '../');

module.exports = ({config, mode}) => {
  // Extend defaultConfig as you need.
  config
    .module
    .rules
    .push({
      test: /\.scss$/,
      include: root,
      use: [
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    });

    config
    .module
    .rules
    .push({
      test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            mimetype: 'image/svg+xml'
          }
        }
      ]
    });

    config
    .resolve
    .extensions
    .push('.scss');
    config.resolve.alias.root = root;
    config.resolve.alias.src = path.resolve(root, 'src');
    config.resolve.alias.components = path.resolve(root, 'src/components');

  return config;
};
