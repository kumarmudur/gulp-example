const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

/*
    --Top Level Functions
    gulp.task  - Define tasks
    gulp.src - Point to files to use
    gulp.dist - Point to folder to output
    gulp.watch - Watch files and folders for changes
*/

// Log message
gulp.task("message", () => {
    return console.log("Gulp is running...");
});

// Copy all html files
gulp.task("copyHtml", () => {
    gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
});

//Optimize image
gulp.task("imageMin", () => {
    gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
});

// Minify js
gulp.task("minify", () => {
    gulp.src("src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});

// Compile sass
gulp.task("sass", () => {
    gulp.src("src/sass/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("dist/css"));
});

// Scripts
gulp.task("scripts", () => {
    gulp.src("src/js/*.js")
        .pipe(concat("main.js"))
        .pipe(gulp.dest("dist/js"));
});

gulp.task("default", [ "message", "copyHtml", "imageMin", "sass", "scripts"]);

gulp.task("watch", () => {
    gulp.watch("src/js/*.js", [ "scripts" ]);
    gulp.watch("src/images/*", [ "imageMin" ]);
    gulp.watch("src/sass/*.scss", [ "sass" ]);
    gulp.watch("src/*.html", [ "copyHtml" ]);
});