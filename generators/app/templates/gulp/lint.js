var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var htmlhint = require('gulp-htmlhint');
var hintOptions = {
    "tagname-lowercase": true,
    "attr-lowercase": true,
    "attr-value-double-quotes": true,
    "doctype-first": false,
    "tag-pair": true,
    "spec-char-escape": true,
    "id-unique": true,
    "src-not-empty": true,
    "attr-no-duplication": true
};

gulp.task('lint:html', function() {
  return gulp.src(path.join(conf.paths.src, '**/**.html'))
    .pipe(htmlhint(hintOptions))
    .pipe(htmlhint.reporter());
});
