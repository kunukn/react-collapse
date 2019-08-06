/*
 * webpack 4+
 * */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");

// const IsWebpackDevServer = /webpack-dev-server/.test(process.env.npm_lifecycle_script);

module.exports = (env = {}, argv = {}) => {
  //console.log('***', 'env', env, 'argv', argv, '***');

  const PRODUCTION = "production";
  const DEVELOPMENT = "development";
  const VALIDATE = "validate";

  let isClassComponent = !!env.CLASS;

  const entries = {
    [PRODUCTION]: isClassComponent
      ? "./src/components/collapse/Collapse.class.jsx"
      : "./src/components/collapse/Collapse.jsx",
    [DEVELOPMENT]: "./src/development-entry",
    [VALIDATE]: "./src/validate-entry"
  };

  let type;
  if (env.VALIDATE) {
    type = VALIDATE;
  } else {
    type = argv.mode === PRODUCTION ? PRODUCTION : DEVELOPMENT;
  }

  let port = env.PORT ? env.PORT : 5555;

  const isProd = argv.mode === PRODUCTION;
  let entry = entries[type];

  console.log("***", type, entry, "***");
  console.log("isClassComponent", isClassComponent);

  let config = {
    devtool: isProd ? "source-map" : "cheap-module-source-map",
    mode: isProd ? PRODUCTION : DEVELOPMENT,
    optimization: {
      minimizer: [
        isProd &&
          new UglifyJsPlugin({
            uglifyOptions: {
              mangle: true,
              compress: {
                drop_console: true
              },
              output: {
                comments: false
              }
            },
            cache: true,
            parallel: true,
            sourceMap: true,
            extractComments: true
          }),
        isProd &&
          new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
              sourcemap: true
            }
          })
      ].filter(Boolean)
    },
    entry: {
      Collapse: entry
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      chunkFilename: "[name].js",
      filename: "[name].js",
      library: "Collapse",
      libraryTarget: "umd",
      publicPath: "/"
    },
    devServer: {
      //https: true,
      port,
      contentBase: path.join(__dirname, ""),
      publicPath: "/",
      open: true,
      hot: true,
      disableHostCheck: true,
      watchContentBase: true,
      historyApiFallback: true
    },
    performance: {
      maxEntrypointSize: 8000,
      hints: false,
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "html-loader",
              options: {
                minimize: isProd
              }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: path.join(__dirname, "src"),
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          include: path.join(__dirname),
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : "style-loader",
              options: isProd
                ? {
                    publicPath: "./"
                  }
                : {}
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          include: path.join(__dirname),
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : "style-loader",
              options: isProd
                ? {
                    publicPath: "./"
                  }
                : {}
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ].filter(Boolean)
    },
    plugins: [
      new webpack.DefinePlugin({
        WEBPPACK_IS_CLASS_COMPONENT: JSON.stringify(isClassComponent)
      }),
      isProd && new CleanWebpackPlugin("dist", {}),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name]-[id].css"
      }),
      new HtmlWebpackPlugin({
        compile: false,
        inject: true,
        hash: true,
        template: "src/index.html",
        filename: "index.html"
      }),
      // This is necessary to emit hot updates (currently CSS only):
      //!isProd && new webpack.HotModuleReplacementPlugin(),
      new WebpackMd5Hash()
    ].filter(Boolean),
    resolve: {
      modules: [path.resolve(__dirname), 'node_modules'],
      extensions: [".js", ".jsx", ".scss"],
      alias: {
        "~": __dirname,
        src: path.resolve(__dirname, "src"),
        components: path.resolve(__dirname, "src/components")
      }
    },
    externals: {}
  };

  if (isProd) {
    config.externals["react"] = {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
      umd: "react"
    };
    config.externals["react-dom"] = {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
      umd: "react-dom"
    };
  }

  return config;
};
