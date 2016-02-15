var gulp = require("gulp");
var browserify = require("browserify");
var tracuer = require("gulp-traceur");
var source = require('vinyl-source-stream');
var concat = require("gulp-concat");
var del = require("del");
var gls = require('gulp-live-server');
var runSequence = require('run-sequence');
var server = gls.new("server.js");
var ENGINE_SRC = ["engine/**/*.js"];
var GAME_SRC = ["example/js/**/**.js", "example/server.js", "example/client.js"];



var onerror = function (e) {
  console.log("\033[31m WARNING: YOUR STUFF ISNT TRANSPILING")
  console.log(e.message)
  this.emit("end");
}

gulp.task("js:clean:tmp", function () {
  return del(["tmp/"]);
})

gulp.task("js:clean:dist", function () {
  return del(["example/dist/**.js"]);
})

gulp.task("js:engine", function () {
  return gulp.src(ENGINE_SRC)
    .pipe(tracuer())
    .on("error", onerror)
    .pipe(gulp.dest("tmp/node_modules/engine"))
})

gulp.task("js:game", function () {
  return gulp.src(GAME_SRC, {base :"./example"})
    .pipe(tracuer())
    .on("error", onerror)
    .pipe(gulp.dest("tmp/"))
})

gulp.task("js:browserify:client", function () {
  return browserify("tmp/client.js")
  .bundle()
  .on("error", onerror)
  .pipe(source('client.js'))
  .pipe(gulp.dest("example/dist/"))
})

gulp.task("js:browserify:server", function () {
  return browserify("tmp/server.js")
  .bundle()
  .on("error", onerror)
  .pipe(source('server.js'))
  .pipe(gulp.dest("example/dist/"))
})

gulp.task("js:build:client", function () {
  return gulp.src(["engine/lib/gl-matrix.js", "tmp/dist/client.js"])
    .pipe(concat("client.js"))
    .pipe(gulp.dest("example/dist"))
})

gulp.task("js:build:server", function () {
  return gulp.src(["engine/lib/gl-matrix.js", "tmp/dist/server.js"])
    .pipe(concat("server.js"))
    .pipe(gulp.dest("example/dist/"))
})

gulp.task("js:all", function () {
  //server.start(server);
  runSequence(
    ["js:clean:tmp", "js:clean:dist"], 
    ["js:engine", "js:game"], 
    ["js:browserify:client", "js:browserify:server"],
    "server"
    );
})

gulp.task("server", function () {
  server.start.bind(server)();
})

//echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
gulp.task("default", ["js:all"], function () {
  
  gulp.watch(ENGINE_SRC, ["js:all"]);
  gulp.watch(GAME_SRC, ["js:all"]);
  //gulp.watch(SERVER_SRC, ["js:all"]);
})