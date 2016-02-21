var gulp = require('gulp'); 
var minifyCSS = require('gulp-minify-css');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var exec = require('child_process').exec;

gulp.task('styles', function() {
  gulp.src(['./src/styles/random-flicker-img.css'])
    .pipe(concat('styles-min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('scripts', function() {
  gulp.src(['./src/scripts/RandomFlickerImageComponent.js'])
    .pipe(concat('source.js'))
    .pipe(minify())
    .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('placeholder', function() {
    gulp.src('./src/placeholder.jpg')
    .pipe(gulp.dest('./dist'));
});

gulp.task('dependencies', function() {
	gulp.src(['./src/scripts/knockout-3.4.0.js','./src/scripts/jquery-2.2.0.min.js'])
	.pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('dist', ['styles', 'scripts', 'placeholder', 'dependencies'], function() {});

gulp.task('dev', function (cb) {
  exec('node server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('default', ['dev'], function() {});