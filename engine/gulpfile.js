var gulp = require("gulp");
var traceur = require("gulp-traceur");


gulp.task("default", function () {
	return gulp.src(["/**/*.js", "!lib/", "!dist/"])
		.pipe(traceur())
		.pipe(gulp.dest("dist/dist.js"))
})