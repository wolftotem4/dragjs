/*jshint node:true */
"use strict";

var gulp            = require('gulp');
var uglify          = require('gulp-uglify');
var concat          = require("gulp-concat");
var compilerPackage = require('google-closure-compiler');
var closureCompiler = compilerPackage.gulp();
var sourcemaps      = require('gulp-sourcemaps');
var path            = require('path');
var pump            = require('pump');

var googBasePath = path.resolve(require.resolve('google-closure-library'), '..', '..', 'base.js');

var compilerFlags = {
  externs: [
    compilerPackage.compiler.CONTRIB_PATH + '/externs/jquery-3.2.js',
    // 'externs/**/*.js',
  ],
  generate_exports: true,
  warning_level: 'VERBOSE',
  jscomp_error: '*',
  language_in: 'ECMASCRIPT6_STRICT',
  language_out: 'ECMASCRIPT5',
  compilation_level: 'ADVANCED',
  output_wrapper_file: 'build/wrapper.template.js',
  define: [
    'COMPILED=true',
    'goog.STRICT_MODE_COMPATIBLE=true',
    'goog.ENABLE_DEBUG_LOADER=false',
    'goog.DEBUG=false',
    // 'goog.asserts.ENABLE_ASSERTS=false',
  ]
};

gulp.task('dropzone', function () {
  return gulp.src([
    googBasePath,
    'lib/closure/datatransfer/**/*.js',
    'lib/closure/drop/**/*.js',
  ], {base: './'})
  .pipe(sourcemaps.init())
  .pipe(closureCompiler(
    Object.assign({}, compilerFlags, {
      js_output_file: 'dropzone.min.js',
    })
  ))
  .pipe(sourcemaps.write('/'))
  .pipe(gulp.dest('dist'));
});

gulp.task('dragjs-jquery', function (cb) {
  pump([
    gulp.src('lib/drag.jquery.js'),
    uglify(),
    gulp.dest('dist')
  ], cb);
});

gulp.task('dragjs-closure', function () {
  return gulp.src([
    googBasePath,
    'lib/closure/**/*.js'
  ], {base: './'})
  .pipe(sourcemaps.init())
  .pipe(closureCompiler(
    Object.assign({}, compilerFlags, {
      js_output_file: 'dragjs.min.js',
    })
  ))
  .pipe(sourcemaps.write('/'))
  .pipe(gulp.dest('dist'));
});

gulp.task('dragjs-concat', function () {
  return gulp.src(['dist/drag.jquery.js', 'dist/dragjs.min.js'])
    .pipe(concat('dragjs.jquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('dragjs', gulp.series(gulp.parallel('dragjs-closure', 'dragjs-jquery'), 'dragjs-concat'));

gulp.task('all', gulp.parallel('dragjs', 'dropzone'));

gulp.task('default', gulp.parallel('dragjs'));
