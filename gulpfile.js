var path = require('path');
var gulp = require('gulp');
var babel = require("gulp-babel");
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require('./webpack.config.js');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var SRC_PATH = path.resolve(APP_PATH, 'src');
var BUILD_PATH = path.resolve(APP_PATH, 'build');


// 开发
var webpackConfigDev = Object.create(webpackConfig);
webpackConfigDev.devtool = 'eval-source-map';
webpackConfigDev.debug = true;

var devCompiler = webpack(webpackConfigDev);

// renderer process 的 webpack 编译
gulp.task('webpack:build-dev', function () {
  devCompiler.run(function (err, status) {
    if (err) {
      throw new gutil.PluginError('webpack:build-dev', err);
    }
    gutil.log('[webpack:build-dev]', status.toString({
      colors: true
    }));
  });
});

gulp.task('watch', ['webpack:build-dev'], function () {
  gulp.watch([SRC_PATH + '/**/*.{html,js,less,css}'], ['webpack:build-dev']);
});

gulp.task('devserver', function() {

  webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:1000/", "webpack/hot/dev-server");
  var compiler = webpack(webpackConfig);
  var server = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    stats: {
      color: true,
    }
  });
  server.listen(1000);
});

gulp.task('dev', ['watch']);
