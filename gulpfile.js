var gulp = require("gulp");
var browserify = require("browserify");
var tracuer = require("gulp-traceur");
var source = require('vinyl-source-stream');
var concat = require("gulp-concat");
var del = require("del");
var gls = require('gulp-live-server');
var runSequence = require('run-sequence');

var ENGINE_SRC = ["engine/**/*.js", "!engine/lib/**/*.js"];
var CLIENT_SRC = ["example/public/**/*.js", "!example/public/bower_components/**/*.js", "!example/public/dist/**/*.js", "!example/public/server.js"];
var SERVER_SRC = ["example/public/**/*.js", "!example/public/bower_components/**/*.js", "!example/public/dist/**/*.js", "!example/public/client.js"];

var onerror = function (e) {
  console.log("\033[31m WARNING: YOUR STUFF ISNT TRANSPILING")
  console.log(e.message)
  this.emit("end");
}


gulp.task("js:clean", function () {
  return del(["tmp/"]);
})

gulp.task("js:engine", function () {
  return gulp.src(ENGINE_SRC)
    .pipe(tracuer())
    .on("error", onerror)
    .pipe(gulp.dest("tmp/node_modules/engine"))
})

gulp.task("js:client", function () {
  return gulp.src(CLIENT_SRC)
    .pipe(tracuer())
    .on("error", onerror)
    .pipe(gulp.dest("tmp/"))
})

gulp.task("js:server", function () {
  return gulp.src(SERVER_SRC)
    .pipe(tracuer())
    .on("error", onerror)
    .pipe(gulp.dest("tmp/"))
})


gulp.task("js:browserify:client", function () {
  return browserify("tmp/client.js")
  .bundle()
  .on("error", onerror)
  .pipe(source('clientbundle.js'))
  .pipe(gulp.dest("tmp/build/"))
})

gulp.task("js:browserify:server", function () {
  return browserify("tmp/server.js")
  .bundle()
  .on("error", onerror)
  .pipe(source('serverbundle.js'))
  .pipe(gulp.dest("tmp/build/"))
})


gulp.task("js:build:client", function () {
  return gulp.src(["engine/lib/gl-matrix.js", "tmp/build/clientbundle.js"])
    .pipe(concat("client.js"))
    .pipe(gulp.dest("example/public/dist/"))
})

gulp.task("js:build:server", function () {
  return gulp.src(["engine/lib/gl-matrix.js", "tmp/build/serverbundle.js"])
    .pipe(concat("server.js"))
    .pipe(gulp.dest("example/public/dist/"))
})

gulp.task("js:all", function () {
  runSequence("js:clean", 
    ["js:engine", "js:client", "js:server"], 
    ["js:browserify:client", "js:browserify:server"], 
    ["js:build:client", "js:build:server"]
    );
})

//echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
gulp.task("default", ["js:all"], function () {
  var server = gls.new("server.js");
  server.start();
  gulp.watch(ENGINE_SRC, ["js:all"]);
  gulp.watch(CLIENT_SRC, ["js:all"]);
  gulp.watch(SERVER_SRC, ["js:all"]);
})