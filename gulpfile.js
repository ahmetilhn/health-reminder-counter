"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
//sass convertor and watch
gulp.task("sass", () => {
  return gulp
    .src(["src/styles/style.scss", "assets/sass/responsive.scss"])
    .pipe(sass())
    .pipe(gulp.dest("assets/css"));
});

gulp.task("watch", () => {
  gulp.watch("assets/sass/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.series("watch"));
