var gulp = require("gulp");
var browserify = require("browserify");
var tracuer = require("gulp-traceur");
var source = require('vinyl-source-stream');
var concat = require("gulp-concat");
var del = require("del");
var gls = require('gulp-live-server');
var runSequence = require('run-sequence');
var cache = require('gulp-cached');
var server = gls.new("server.js");
var karma = require('karma').Server;

var ENGINE_SRC = ["engine/**/*.js"];

var RAW_SRC    = [
  "example/js/client/**/*.js", 
  "example/js/server/**/*.js",
  "example/js/shared/**/*.js", 
  "example/client.js", 
  "example/server.js"
  ];

var CLIENT_SRC = [
  "example/build/js/client/**/*.js", 
  "example/build/js/shared/**/*.js",
  "example/build/client.js",
  "example/build/node_modules/engine/**/*.js"
  ];

var SERVER_SRC = [
  "example/build/js/server/**/*.js", 
  "example/build/js/shared/**/*.js", 
  "example/build/server.js",
  "example/build/node_modules/engine/**/*.js"
  ];

var onerror = function (e) {
  console.log("\033[31m WARNING: YOUR STUFF ISNT TRANSPILING")
  console.log(e.message)
  this.emit("end");
}


gulp.task("js:clean", function () {
  return del(["example/build/"]);
})

gulp.task("js:engine", function () {
  return gulp.src(ENGINE_SRC)
    .pipe(cache('engine'))
    .pipe(tracuer())
    .on("error", onerror)
    .pipe(gulp.dest("example/build/node_modules/engine/"))
})

gulp.task("js:tracuer", function () {
  return gulp.src(RAW_SRC, {base :"./example"})
    .pipe(cache('source'))
    .pipe(tracuer())
    .on("error", onerror)
    .pipe(gulp.dest("example/build/"))
})

gulp.task("js:client", function () {
  return browserify("example/build/client.js")
  .bundle()
  .on("error", onerror)
  .pipe(source('client.js'))
  .pipe(gulp.dest("example/dist/"))
})

gulp.task("js:server", function () {
  return browserify("example/build/server.js")
  .bundle()
  .on("error", onerror)
  .pipe(source("server.js"))
  .pipe(gulp.dest("example/dist/"))
})


gulp.task("js:watch", function () {
   gulp.watch(ENGINE_SRC, ["js:engine"]);
   gulp.watch(RAW_SRC, ["js:tracuer"]);
   gulp.watch(CLIENT_SRC, ["js:client"])
   gulp.watch(SERVER_SRC, ["js:server"]);
})

gulp.task("server", function () {
    var server = gls.static('example/dist', 8888);
    server.start();
})

gulp.task('test:single', function (done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

//echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
gulp.task("default", function () {
   runSequence(
    "js:clean", 
    ["js:engine", "js:tracuer"],
    ["js:client", "js:server"],
    "js:watch",
    "server"
    );
})