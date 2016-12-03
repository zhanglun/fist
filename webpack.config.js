var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

// 定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var SRC_PATH = path.resolve(APP_PATH, 'src');
var BUILD_PATH = path.resolve(APP_PATH, 'build');


module.exports = {
  entry: {
    'app': [SRC_PATH + '/index.js'],
  },
  output: {
    path: BUILD_PATH,
    filename: './[name].bundle.js'
  },

  resolve: {
    root: path.resolve(__dirname),
    alias: {
      sweetalert: 'node_modules/sweetalert/lib/sweetalert.js',
      sweetalertcss: 'node_modules/sweetalert/dist/sweetalert.css',
      codemirrorcss: 'node_modules/codemirror/lib/codemirror.css',
    },
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
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
      },
      {
        test: /.less$/,
        loader: 'style!css!less',
        include: [SRC_PATH],
      },
      {
        test: /.css$/,
        loader: 'style!css',
      },
    ],
  },
  externals: {},
  plugins: [
    // new ExtractTextPlugin('style.bundle.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery',
      firebase: 'firebase',
    }),
    new HtmlWebpackPlugin({
      template: SRC_PATH + '/index.html',
      filename: BUILD_PATH + '/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new CopyWebpackPlugin([{
    //   from: SRC_PATH + '/vendor',
    //   to: BUILD_PATH + '/vendor',
    // }]),
    // new CommonsChunkPlugin({
    //   name: ['react'],
    //   // filename: 'react.bundle.js',
    //   minChunks: Infinity
    // }),
  ],
};