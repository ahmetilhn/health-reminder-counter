'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
//sass convertor 
gulp.task('sass', () => {
  return gulp.src('assets/sass/style.scss').pipe(sass()).pipe(gulp.dest('assets/css'));
});
//Sass watching
gulp.task('watch', () => {
  gulp.watch('assets/sass/*.scss', gulp.series('sass'))
});

//start watching
gulp.task('default', gulp.series('watch'));