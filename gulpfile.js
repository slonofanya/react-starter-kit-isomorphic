/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var browserify = require('browserify');
var babelify = require("babelify");
var watchify = require("watchify");
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var lodash = require("lodash");

var argv = require('minimist')(process.argv.slice(2));

var RELEASE = !!argv.release;
var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var src = {};
var watch = false;
var browserSync;

// The default task
gulp.task('default', ['serve']);

// Clean output directory
gulp.task('clean', del.bind(
  null, ['dist/*'], {dot: true}
));

var bundle_browser = watchify(browserify(lodash.extend({},
  watchify.args,
  {
    entries: ['./app/browser.js'],
    debug: true
  }
)));

bundle_browser.transform(babelify);
bundle_browser.on('update', bundleBrowser);
bundle_browser.on('log', gutil.log);

function bundleBrowser() {
  return bundle_browser.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist/public/js'));
}
gulp.task('bundle:browser', bundleBrowser);

// Bundle
gulp.task('bundle:serve', function (cb) {
  var started = false;
  var config = require('./webpack.config.js');
  var bundler = webpack(config);

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    if (argv.verbose) {
      $.util.log('[webpack]', stats.toString({colors: true}));
    }

    if (!started) {
      started = true;
      return cb();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

// Build the app from source code
gulp.task('build', ['clean'], function (cb) {
  runSequence(['bundle:serve', 'bundle:browser'], cb);
});

// Build and start watching for modifications
gulp.task('build:watch', ['build'], function (cb) {
  cb();
});

// Launch a Node.js/Express server
gulp.task('serve', ['build:watch'], function (cb) {
  src.server = [
    'dist/serve.js'
  ];

  var first_run = true;
  var child_process = require('child_process');
  var assign = require('react/lib/Object.assign');

  var server = (function startup() {
    var child = child_process.fork('dist/serve.js', {
      env: assign({NODE_ENV: 'development'}, process.env)
    });
    child.once('message', function (message) {
      if (message.match(/^online$/)) {
        if (browserSync) {
          browserSync.reload();
        }

        if (first_run) {
          first_run = false;
          //gulp.watch(src.server, function () {
          //	$.util.log('Restarting development server.');
          //	server.kill('SIGTERM');
          //	server = startup();
          //});
          cb();
        }
      }
    });
    return child;
  })();

  process.on('exit', function () {
    server.kill('SIGTERM');
  });
});
