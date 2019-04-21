// PACKAGE_VERSION=2.1.3 gulp
// PACKAGE_VERSION=2.1.3_2 gulp
packageVersion = process.env.PACKAGE_VERSION || "";
fomanticVersion = null;
if (packageVersion === "") {
  console.log("PACKAGE_VERSION is needed");
  process.exit(1);
} else {
  if (packageVersion.indexOf("_") > -1) {
    fomanticVersion = packageVersion.substring(0, packageVersion.indexOf("_"));
  } else {
    fomanticVersion = packageVersion;
  }
}
console.log("Package Version " + packageVersion);
console.log("Fomantic Version " + fomanticVersion);

const gulp = require('gulp');
const runSequence = require('run-sequence');
// import gulp-tasks
const requireDir = require('require-dir');
var tasks = requireDir('./gulp-tasks');

// Make info global
info = null;
try {
  info = require('./tmp/info');
} catch (e) {
  console.log('./tmp/info.js does not exist. run gulp info');
}

gulp.task('meteorize', function(callback) {
  var tasks = [
    'clean',
    'info',
    'fomantic-ui-original',
    'fomantic-ui-modified',
    'data',
    'fomantic-ui-data',
    'fomantic-ui',
    callback
  ];

  runSequence.apply(this, tasks);
});

gulp.task('default', ['meteorize']);
