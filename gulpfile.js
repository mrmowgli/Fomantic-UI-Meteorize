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
// import gulp-tasks
const requireDir = require('require-dir');
var dirTasks = requireDir('./gulp-tasks');

// Make info global
info = null;
gulp.task('requireInfo', gulp.series('info', callback => {
  info = require('./tmp/info.js');
  callback();
}));

var tasks = [
  'clean',
  'info',
  'requireInfo',
  'fomantic-ui-original',
  'fomantic-ui-modified',
  'data',
  'fomantic-ui-data',
  'fomantic-ui'
];

gulp.task('default', gulp.series(tasks));
