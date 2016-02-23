
var gulp = require("gulp");
var karma = require('karma').Server;

gulp.task('test:single', function (done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
