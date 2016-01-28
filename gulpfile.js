var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sassGlob = require('gulp-sass-glob');
var twig = require('gulp-twig');
var data = require('gulp-data');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var util = require("gulp-util");

var Firebase = require('firebase');
var ref = new Firebase('https://shelter-pattern-lib.firebaseio.com/');

var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var reload = browserSync.reload;

//FUNCTIONS =============================

// Error notifications

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

//TASKS =================================

// Sass

gulp.task('sass', function() {
  gulp.src('src/base_scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', handleErrors))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});


// Browser Sync

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Twig compiling

gulp.task('compile', function() {
  gulp.src('./index.twig')
    .pipe(data(function(file, cb) {
      // Access firebase db and return data object via callback
      ref.on("value", function(snapshot) {
        var data = snapshot.val();
        cb(undefined, data);
      });
    }))
    .pipe(twig())
    .pipe(gulp.dest('./'));
});

// Default task

gulp.task('default', ['sass', 'compile', 'browser-sync'], function() {
  gulp.watch('./**/*.scss', ['sass']);
  gulp.watch('./*.twig', ['compile']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});
