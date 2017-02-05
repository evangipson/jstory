var gulp = require("gulp");
var concat = require("gulp-concat");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var es2015 = require('babel-preset-es2015');
var obfuscate = require("gulp-obfuscate");

// General log function for gulp
gulp.task("log", function(message) {
    gutil.log(message);
});

// All the logs we'll use
var logs = {
    introMessage: " === Running gulp to build SASS and JavaScript === ",
    sass: " === Finished building SCSS into css/style.css === ",
    javascript: " === Obfuscating and minifying javascript into js/jstory.js === ",
    endMessage: " === Done running gulp! === "
};

gulp.task("begin", function() {
    gutil.log(logs.introMessage);
});

gulp.task("sass", function() {
    gulp.src("src/sass/*.scss")
    .pipe(sass({outputStyle: 'extended'})
        .on("error", sass.logError))
    .pipe(concat("style.css"))
    .pipe(gulp.dest("css"));
    gutil.log(logs.sass);
});

gulp.task("javascript", function() {
    gulp.src("src/js/*.js")
    .pipe(babel({ presets: [es2015] }))
    .pipe(concat("jstory.js"))
    .pipe(obfuscate())
    .pipe(uglify().on('error', function(e){
         console.log(e);
    }))
    .pipe(gulp.dest("js"));
    gutil.log(logs.javascript);
});

gulp.task("end", function() {
    gutil.log(logs.endMessage);
});

/* A simple gulp watch task */
/* gulp.task("watch", function() {
    gulp.watch("src/sass/main.sass", ["sass"]);
    gulp.watch("src/js/main.js", ["javascript"]);
}); */

/* You have to set up a default task, so lets run
 * all the gulp.tasks we defined above */
gulp.task("default", ["begin", "sass", "javascript", "end"]);