var gulp = require('gulp');
var shelljs = require('shelljs');
var babel = require('gulp-babel');
var cwd = __dirname;
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

gulp.task('clean', function clean() {
  shelljs.rm('-rf', path.join(cwd, 'lib'));
  shelljs.rm('-rf', path.join(cwd, 'assets'));
});

// copy all the files except js/jsx/less/sass/scss/css to lib folder
gulp.task('copy', function () {
  return gulp.src([
    './src/**/*',
    '!./src/**/*.js',
    '!./src/**/*.jsx',
    '!./src/**/*.less',
    '!./src/**/*.scss',
    '!./src/**/*.sass',
    '!./src/**/*.css'
    ]).pipe(gulp.dest('./lib/'));
});

gulp.task('copy_assets', function() {
  var base = "./src/assets/";
  return gulp.src(base + '*.{eot,woff,woff2,ttf,svg,png,jpg,gif}')
    .pipe(gulp.dest('./assets/'));
});

gulp.task('css', function() {
  var through2 = require('through2');
  var base = "./src/assets/";
  var postcss = require('gulp-postcss');
  var autoprefixer = require('autoprefixer-core');
  var combiner = require('stream-combiner2');

  var combined = combiner.obj([
    gulp.src(base + '*.css'),
    postcss([autoprefixer]),
    gulp.dest('./assets/')
  ]);

  combined.on('error', console.error.bind(console));
  return combined;
});

gulp.task('css:watch', function () {
      gulp.watch('./src/assets/**', ['css']);
});

gulp.task('babel', ['clean'], function () {
  return gulp.src(['src/**.js',  'src/**/*.js', 'src/**.jsx', 'src/**/*.jsx'])
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('compile', ['copy', 'copy_assets', 'babel', 'css']);

gulp.task('server', function () {
  var server = new WebpackDevServer(webpack(webpackConfig),
    { hot: true, historyApiFallback: true, publicPath: '/dist/' });
  server.listen(3000, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Listening at http://localhost:3000/');
  })
});

gulp.task('start', ['server', 'css', 'css:watch']);

