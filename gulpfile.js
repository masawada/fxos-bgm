'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

var AUTOPREFIXER_BROWSERS = [
    'ff >= 30'
];

gulp.task('styles', function () {
    return gulp.src('css/styles.less')
        .pipe($.less({
            paths: ['css']
        }))
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(gulp.dest('css'));
});

gulp.task('serve', ['styles'], function (cb) {
    browserSync({
        files: '**/*',
        server: {
            baseDir: ['']
        },
        open: false
    }, cb);
    gulp.watch(['css/**/*.less'], ['styles', browserSync.reload]);
    gulp.watch(['!css/**/*'], [ browserSync.reload]);
});

gulp.task('default', ['styles'], function (cb) {
  cb();
});
