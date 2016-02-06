var gulp = require("gulp");
var browserify = require("browserify");
var tracuer = require("gulp-traceur");
var source = require('vinyl-source-stream');
var concat = require("gulp-concat");
var del = require("del");
var gls = require('gulp-live-server');

var ENGINE_SRC = ["engine/**/*.js", "!engine/lib/**/*.js"];
var GAME_SRC = ["example/public/**/*.js", "!example/public/bower_components/**/*.js", "!example/public/dist/**/*.js"];

var onerror = function (e) {
  console.log("\033[31m WARNING: YOUR STUFF ISNT TRANSPILING BRUH")
  console.log(e.message)
  this.emit("end");
}

gulp.task("js:harmony", ["js:clean"], function () {
  
  gulp.src(ENGINE_SRC)
    .pipe(tracuer())
    .on("error", onerror)
    .pipe(gulp.dest("tmp/node_modules/engine"))

  gulp.src(GAME_SRC)
    .pipe(tracuer())
    .on("error", onerror)
    .pipe(gulp.dest("tmp/"))

})

gulp.task("js:browserify", ["js:harmony"], function () {
  return browserify("tmp/main.js")
  .bundle()
  .on("error", onerror)
  .pipe(source('bundle.js'))
  .pipe(gulp.dest("tmp/build/"))
})


gulp.task("js:clean", function () {
  return del(["tmp/**/*.js"]);
})

gulp.task("js:build", ["js:browserify"], function () {
  return gulp.src(["tmp/build/bundle.js", "engine/lib/**/*.js"])
    .pipe(concat("app.js"))
    .pipe(gulp.dest("example/public/dist/"))
})

//echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
gulp.task("default", ["js:build"], function () {
  var server = gls.new("server.js");
  server.start();

  gulp.watch(ENGINE_SRC, ["js:build"]);
  gulp.watch(GAME_SRC, ["js:build"]);
})