'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const rename      = require('gulp-rename');

// **** DIRECTORIES ****
var dirs = {
  src: './src/',
  dest: './dist/',
  tmp: '/tmp/webstarter'
};

var scss = {
  src: dirs.src + 'scss/style.scss',
  dest: dirs.dest + 'css/',
  watch: dirs.src + 'scss/**/*.scss',
  opts: {
    includePaths: [dirs.tmp], // to include normalize.css
    outputStyle: 'normal'
  }
}

var html = {
  src: dirs.src + '**/*.html',
  dest: dirs.dest
}

var img = {
  src: dirs.src + 'img/*.{png,jpg,gif}',
  dest: dirs.dest + 'img/'
}

// **** TASKS ****

// Copy images
gulp.task('copy:img', function() {
  return gulp.src(img.src)
    .pipe(gulp.dest(img.dest));
//    .pipe(browserSync.stream());
});

// Rename normalize.css in order to get included in style.scss
// The renamed file will be saved in dirs.tmp folder
gulp.task('copy:normalize', function() {
  return gulp.src('./node_modules/normalize.css/normalize.css')
    .pipe(rename('_normalize.scss'))
    .pipe(gulp.dest(dirs.tmp));
});

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
  return gulp.src(scss.src)
    .pipe(sass(scss.opts))
    .pipe(gulp.dest(scss.dest))
    .pipe(browserSync.stream());
});

// Copy html filed in dest folder
gulp.task('copy:html', function() {
  return gulp.src(html.src)
    .pipe(gulp.dest(html.dest))
    .pipe(browserSync.stream());
});

// All copy tasks
gulp.task('copy', [
  'copy:img',
  'copy:html',
  'copy:normalize'
]);

// Watch Sass & Serve
gulp.task('serve', ['copy', 'sass'], function() {

  browserSync.init({
    server: dirs.dest
  });

  gulp.watch(scss.watch, ['sass']);
  gulp.watch(['src/**/*.html'], ['copy:html']);
});


gulp.task('default', ['serve']);

