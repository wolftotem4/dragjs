/*jshint node:true */
"use strict";

var gulp = require('gulp');
var compilerPackage = require('google-closure-compiler');
var closureCompiler = require('gulp-closure-compiler');

gulp.task('closure-compiler', function () {
  return gulp.src([
    'node_modules/google-closure-library/closure/goog/base.js',
    'lib/**/*.js'
  ])
  .pipe(closureCompiler({
    compilerPath: compilerPackage.compiler.JAR_PATH,
    fileName: 'output.min.js',
    compilerFlags: {
      externs: [
        compilerPackage.compiler.CONTRIB_PATH + '/externs/jquery-3.2.js',
        'externs/**/*.js',
      ],
      generate_exports: true,
      warning_level: 'VERBOSE',
      jscomp_error: '*',
      language_in: 'ECMASCRIPT6_STRICT',
      language_out: 'ECMASCRIPT5',
      compilation_level: 'ADVANCED_OPTIMIZATIONS',
      create_source_map: 'dist/output.js.map',
      output_wrapper_file: 'build/wrapper.template.js',
      define: [
        'COMPILED=true',
        'goog.STRICT_MODE_COMPATIBLE=true',
        'goog.ENABLE_DEBUG_LOADER=false',
        'goog.DEBUG=false',
        'goog.asserts.ENABLE_ASSERTS=false',
      ],
    }
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['closure-compiler']);
