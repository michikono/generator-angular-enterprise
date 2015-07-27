var gulp = require('gulp');
var mocha = require('gulp-spawn-mocha');
var gutil = require('gulp-util');

// aliases
gulp.task('test', ['mocha']);
gulp.task('watch', ['watch-mocha']);

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({ reporter: 'nyan' }))
    .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
  gulp.watch(['generators/**', 'test/**'], ['mocha']);
});

