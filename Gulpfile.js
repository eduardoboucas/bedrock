'use strict';

// --------------------------------------------------------------
// Dependencies
// --------------------------------------------------------------

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// --------------------------------------------------------------
// Compile Sass
// --------------------------------------------------------------

gulp.task('build-sass', function () {
    return gulp.src([
        'sass/main.scss'
    ])
    .pipe(plugins.sass({
        outputStyle: 'compressed'
    }).on('error', plugins.sass.logError))
    .pipe(gulp.dest('public/css'));
});

// --------------------------------------------------------------
// Auto prefixer
// --------------------------------------------------------------

gulp.task('autoprefixer', function () {
    return gulp.src('src/app.css')
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

// --------------------------------------------------------------
// Concatenate/minify JS
// --------------------------------------------------------------

gulp.task('build-scripts', function() {
    return gulp.src([
            './public/js/main.js',
            './public/js/templates/*.js'
        ])
        .pipe(plugins.concat('main.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./public/js'));
});

// --------------------------------------------------------------
// Watch for changes
// --------------------------------------------------------------

gulp.task('watch', function() {
    gulp.watch(['public/js/**/*.js'], ['build-scripts']);
    gulp.watch(['sass/**/*.scss'], ['build-sass', 'autoprefixer']);
});

// --------------------------------------------------------------
// Default task
// --------------------------------------------------------------

gulp.task('default', ['build-sass']);
