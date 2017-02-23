var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var SRC_PATH = path.resolve(APP_PATH, 'src');
var BUILD_PATH = path.resolve(APP_PATH, 'build');

/**
 * 基本配置
 */
var config = {
  entry: {
    'app': ["webpack/hot/dev-server", "webpack-dev-server/client?http://localhost:5000/", SRC_PATH + '/index.js'],
  },
  output: {
    path: BUILD_PATH,
    filename: './[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      exclude: [
        path.resolve(__dirname, "node_modules"),
      ],
      loader: "babel-loader",
      query: {
        presets: ['es2015', 'react'],
        // plugins: ['transform-runtime'],
      },
      include: [APP_PATH],
    }, {
      test: /.less$/,
      loaders: ['style-loader', 'css-loader', 'less-loader'],
      include: [SRC_PATH],
    }, {
      test: /.css$/,
      loaders: ["style-loader", "css-loader"],
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=fonts/[hash].[ext]',
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'url?limit=10000&&hash=sha512&digest=hex&name=images/[hash].[ext]'
      ],
    },],
  },
  devtool: 'eval-source-map',
  debug: true,
  resolve: {
    root: path.resolve(__dirname),
    alias: {},
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
      }
    }),
    new ProgressBarPlugin({ clear: false }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery',
      firebase: 'firebase',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: SRC_PATH + '/index.html',
      filename: BUILD_PATH + '/index.html',
    }),
  ],
};

module.exports = config;
