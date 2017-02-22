var path = require('path');
var _ = require('lodash');
var argv = require('yargs').argv;
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var babel = require("gulp-babel");
var gutil = require('gulp-util');
var del = require('del');

var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var webpackConfig = require('./webpack.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var SRC_PATH = path.resolve(APP_PATH, 'src');
var BUILD_PATH = path.resolve(APP_PATH, 'build');

// develop
var webpackConfigDev = _.cloneDeep(webpackConfig);
webpackConfigDev.devtool = "source-map";
webpackConfigDev.debug = true;
webpackConfigDev
  .entry
  .app
  .unshift("webpack-dev-server/client?http://localhost:5000/", "webpack/hot/dev-server");
webpackConfigDev.plugins = webpackConfigDev
  .plugins
  .concat([
    // new ExtractTextPlugin('./style.bundle.css'),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({ clear: false })
  ]);

// production
var webpackConfigProduction = _.cloneDeep(webpackConfig);
webpackConfigProduction.plugins = webpackConfigProduction
  .plugins
  .concat([
    new ExtractTextPlugin('./style.bundle.css'),
    // new CopyWebpackPlugin([{
    //   from: SRC_PATH + '/vendor', to: BUILD_PATH +
    //   '/vendor',
    // }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack
      .optimize
      .UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new CommonsChunkPlugin({ name: ['react'], filename: './react.bundle.js', minChunks: Infinity })
  ]);

var devCompiler = webpack(webpackConfigDev);
var productionCompiler = webpack(webpackConfigProduction);

// dev 的 webpack 编译
gulp.task('webpack:dev', function () {
  devCompiler
    .run(function (err, status) {
      if (err) {
        throw new gutil.PluginError('webpack:dev', err);
      }
      gutil.log('[webpack:dev]', status.toString({ colors: true }));
    });
});

gulp.task('webpack:build', ['clean'], function (cb) {
  productionCompiler
    .run(function (err, status) {
      if (err) {
        throw new gutil.PluginError('webpack:build', err);
      }
    });
  cb();
});

gulp.task('watch', ['webpack:dev'], function () {
  gulp.watch([SRC_PATH + '/**/*.{html,js,less,css}'], ['webpack:dev']);
});

// 开发环境 启动 webpack dev server
gulp.task('server', [
  'clean', 'copy:lib'
], function () {
  var server = new WebpackDevServer(devCompiler, {
    hot: true,
    inline: true,
    port: 5000,
    color: true,
    stats: {
      colors: true,
      hash: true,
      version: true,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    },
    'contentBase': './app/build'
  });
  server.listen(5000, function (err, status) {
    if (err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }
    gutil.log("[webpack-dev-server]", "http://localhost:5000/webpack-dev-server/index.html");
  });
});

gulp.task('clean', function (cb) {
  gutil.log('clean build path...');
  del([BUILD_PATH]);
  cb();
});


gulp.task('copy:lib', ['clean'], function () {
  gutil.log('copy lib...');
  return gulp.src([SRC_PATH + '/lib/**/*.{js,swf}'], {
    base: SRC_PATH + '/lib'
  }).pipe(gulp.dest(BUILD_PATH + '/lib/'));
});

// 线上版本的构建
gulp.task('build', ['webpack:build', 'copy:lib']);

gulp.task('deploy', function () {
  return gulp
    .src('./app/build/**/*')
    .pipe(ghPages({ force: true }))
});
