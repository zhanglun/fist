var path = require('path');
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var babel = require("gulp-babel");
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var webpackConfig = require('./webpack.config.js');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var SRC_PATH = path.resolve(APP_PATH, 'src');
var BUILD_PATH = path.resolve(APP_PATH, 'build');


// 开发
var webpackConfigDev = Object.create(webpackConfig);
webpackConfigDev.devtool = 'eval';
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

gulp.task('devserver', ['copy:lib'], function () {
  var serverConfig = Object.create(webpackConfig);
  serverConfig.devtool = "source-map";
  serverConfig.debug = true;
  serverConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:5000/", "webpack/hot/dev-server");
  serverConfig.plugins.push(new ProgressBarPlugin({ clear: false }));
  var compiler = webpack(serverConfig);
  var server = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    port: 5000,
    color: true,
    stats: { colors: true },
    'contentBase': './app/build'
  });
  server.listen(5000, function (err, status) {
    if (err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }
    gutil.log("[webpack-dev-server]", "http://localhost:5000/webpack-dev-server/index.html");
  });
});

gulp.task('copy:lib', function () {
  return gulp.src([SRC_PATH + '/lib/**/*.{js,swf}'], { base: SRC_PATH + '/lib' })
    .pipe(gulp.dest(BUILD_PATH + '/lib/'));
});

gulp.task('dev', ['watch']);


gulp.task('build', ['copy:lib', 'webpack:build-dev']);

gulp.task('deploy', ['build'], function () {
  return gulp.src('./app/build/**/*')
    .pipe(ghPages({
      force: true,
    }))
});