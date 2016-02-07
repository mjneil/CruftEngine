var gulp = require("gulp");
var browserify = require("browserify");
var tracuer = require("gulp-traceur");
var source = require('vinyl-source-stream');
var concat = require("gulp-concat");
var del = require("del");
var gls = require('gulp-live-server');
var runSequence = require('run-sequence');

var ENGINE_SRC = ["engine/**/*.js", "!engine/lib/**/*.js"];
var GAME_SRC = ["example/public/**/*.js", "!example/public/bower_components/**/*.js", "!example/public/dist/**/*.js"];

var onerror = function (e) {
  console.log("\033[31m WARNING: YOUR STUFF ISNT TRANSPILING BRUH")
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

gulp.task("js:game", function () {
  return gulp.src(GAME_SRC)
    .pipe(tracuer())
    .on("error", onerror)
    .pipe(gulp.dest("tmp/"))
})


gulp.task("js:browserify", function () {
  return browserify("tmp/main.js")
  .bundle()
  .on("error", onerror)
  .pipe(source('bundle.js'))
  .pipe(gulp.dest("tmp/build/"))
})


gulp.task("js:build", function () {
  return gulp.src(["engine/lib/gl-matrix.js", "tmp/build/bundle.js"])
    .pipe(concat("app.js"))
    .pipe(gulp.dest("example/public/dist/"))
})

gulp.task("js:all", function () {
  runSequence("js:clean", ["js:engine", "js:game"], "js:browserify", "js:build");
})

//echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
gulp.task("default", ["js:all"], function () {
  var server = gls.new("server.js");
  server.start();
  gulp.watch(ENGINE_SRC, ["js:all"]);
  gulp.watch(GAME_SRC, ["js:all"]);
})