var path = require('path');
var _ = require('lodash');
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var babel = require("gulp-babel");
var gutil = require('gulp-util');
var del = require('del');

var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfigDev = require('./webpack.config.dev.js');
var webpackConfigProd = require('./webpack.config.production.js');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var SRC_PATH = path.resolve(APP_PATH, 'src');
var BUILD_PATH = path.resolve(APP_PATH, 'build');

// develop
var devCompiler = webpack(webpackConfigDev);

// production
var productionCompiler = webpack(webpackConfigProd);

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
