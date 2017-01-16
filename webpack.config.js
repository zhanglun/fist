var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var argv = require('yargs').argv;

// 定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var SRC_PATH = path.resolve(APP_PATH, 'src');
var BUILD_PATH = path.resolve(APP_PATH, 'build');

/**
 * 基本配置
 */
var baseConfig = {
  entry: {
    'app': [SRC_PATH + '/index.js'],
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
      loader: ExtractTextPlugin.extract(['css', 'less']),
      include: [SRC_PATH],
    }, {
      test: /.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=fonts/[hash].[ext]',
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'url?limit=10000&&hash=sha512&digest=hex&name=images/[hash].[ext]'
      ],
    }, ],
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      //  sweetalert: 'node_modules/sweetalert/lib/sweetalert.js',
    },
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
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
  ],
};


/**
 * 生产环境的配置
 * @type {[type]}
 */
var productionConfig = Object.assign({}, baseConfig);
productionConfig.plugins = productionConfig.plugins.concat([
  new ExtractTextPlugin('style.bundle.css'),
  // new CopyWebpackPlugin([{
  //   from: SRC_PATH + '/vendor',
  //   to: BUILD_PATH + '/vendor',
  // }]),
  new CommonsChunkPlugin({
    name: ['react'],
    filename: 'react.bundle.js',
    minChunks: Infinity
  }),
]);



/**
 * 输出
 */

if (argv.dev) {
  module.exports = baseConfig;
} else if (argv.production) {
  module.exports = productionConfig;
} else {
  module.exports = baseConfig;
}
