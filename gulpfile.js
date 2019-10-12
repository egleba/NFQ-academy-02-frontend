const gulp = require('gulp');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");


// Logs Message
gulp.task('message', function(done) {
  console.log('Gulp is running...');
  done();
});


// Copy All HTML files
gulp.task('copyHtml', function(done) {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
  done();
})


// Compile sass
gulp.task('sass', function(done) {
  gulp.src('src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', console.error.bind(console)))
    .pipe(autoprefixer())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
  done();
});


// Serve
gulp.task("serve", function(done) {
  browserSync.init({
    server: "./dist"
  });
  done();
});


// Watch
gulp.task('watch', function(done) {
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyHtml'));
  gulp.watch(["dist/*.html"]).on("change", browserSync.reload);
  done();
});


// Default
gulp.task('default', gulp.series(['message', 'copyHtml', 'sass', 'serve', 'watch']));
