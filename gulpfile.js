"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
//sass convertor and watch
gulp.task("sass", () => {
  return gulp
    .src("src/styles/sass/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/styles/css"));
});

gulp.task("watch", () => {
  gulp.watch("src/styles/sass/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.series("watch"));
