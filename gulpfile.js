var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
//
gulp.task('css', function(){
   gulp.src('stylesheets/*.css')
   .pipe(concat('styles.css'))
   .pipe(cleanCSS())
   .pipe(gulp.dest('public/'));
});
//
gulp.task('default',['css'],function(){
});
