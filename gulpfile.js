var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-obfuscate'); // 引入混淆插件

// 压缩css文件
gulp.task('minify-css', function () {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});

// 压缩js文件
gulp.task('minify-js', function () {
    return gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
        .pipe(uglify())
        .pipe(obfuscate()) // 使用混淆插件
        .pipe(gulp.dest('./public'));
});

gulp.task('default', gulp.series(gulp.parallel('minify-css', 'minify-js')), function () {
    console.log("----------gulp Finished----------");
});