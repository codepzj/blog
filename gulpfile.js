var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css"); // 替换为 gulp-clean-css
var uglify = require("gulp-uglify");

// 压缩 CSS 文件
gulp.task("minify-css", function () {
  return gulp
    .src("./public/**/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" })) // 使用 cleanCSS 进行压缩
    .pipe(gulp.dest("./public"));
});

// 压缩js文件
gulp.task("minify-js", function () {
  return gulp
    .src(["./public/**/*.js", "!./public/**/*.min.js"])
    .pipe(uglify())
    .pipe(gulp.dest("./public"));
});

gulp.task(
  "default",
  gulp.series(gulp.parallel("minify-css", "minify-js")),
  function () {
    console.log("----------gulp Finished----------");
  }
);
