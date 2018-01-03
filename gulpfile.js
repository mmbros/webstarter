const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
	return gulp.src(['src/scss/*.scss'])
		.pipe(sass())
		.pipe(gulp.dest("build/css"))
		.pipe(browserSync.stream());
});


//
gulp.task('html', function() {
	return gulp.src(['src/*.html'])
		.pipe(gulp.dest("build/"))
		.pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass','html'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch(['src/*.html'], ['html']);
});


gulp.task('default', ['serve']);

