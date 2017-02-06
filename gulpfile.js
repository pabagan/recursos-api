/**
 * Module Dependencies
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var batch = require('gulp-batch');

/**
 * Gulp Tasks
 */

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: './bin/www',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['**/*.html'], reload);
});

gulp.task('test', function () {
  gulp.watch(['test/**', 'lib/**'], batch(function (events, cb) {
    return gulp.src(['test/*.js'])
      .pipe(mocha({ reporter: 'list' }))
      .on('error', function (err) {
        console.log(err.stack);
      });
  }));
});

