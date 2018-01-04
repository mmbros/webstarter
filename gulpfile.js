'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const rename      = require('gulp-rename');

var
  src = 'src/',
  dest = 'dist/',
  tmp = 'tmp/';


var scss = {
  src: src + 'scss/style.scss',
  dest: dest + 'css/',
  sassOpts: {
    includePaths: [tmp],
    outputStyle: 'compressed'
  }
}

gulp.task('normalize', function() {
  return gulp.src('./node_modules/normalize.css/normalize.css')
    .pipe(rename('_normalize.scss'))
    .pipe(gulp.dest(tmp));
});

// Compile Sass & Inject Into Browser
gulp.task('sass', ['normalize'], function() {
  return gulp.src(scss.src)
    .pipe(sass(scss.sassOpts))
    .pipe(gulp.dest(scss.dest))
    .pipe(browserSync.stream());
});

// copy:html
gulp.task('copy:html', function() {

  return gulp.src(['src/**/*.html'])
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
});

// copy
gulp.task('copy', [
  'copy:html'
]);

// Watch Sass & Serve
gulp.task('serve', ['copy', 'sass'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch(['src/**/*.html'], ['copy:html']);
});


gulp.task('default', ['serve']);

