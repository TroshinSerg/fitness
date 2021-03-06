"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var image = require('gulp-image');
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore")
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var newer = require("gulp-newer");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

var scriptsPaths = ["source/js/script.js", "source/js/plan.js"];
var vendorScriptsPaths = ["source/js/vendor/jquery.min.js", "source/js/vendor/picturefill.min.js", "source/js/vendor/smooth-scrollbar.js", "source/js/vendor/swiper.min.js"];

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    //.pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer({grid: true}) ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    //.pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch('source/js/*.js', gulp.series('scripts'));
  gulp.watch('source/img/**/*.{png,jpg,svg,webp}', gulp.series('img', 'webp'));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task('img', function() {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(newer('build/img'))
    .pipe(image({
        mozjpeg: false,
        jpegoptim: false,
        jpegRecompress: true
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task("webp", function () {
  return gulp.src("build/img/**/*.{png,jpg}")
    .pipe(webp({quality: 70}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/icons/{icon-*,htmlacademy*}.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("scripts", function() {
  return gulp.src(scriptsPaths)
    .pipe(plumber())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("vendorScripts", function() {
  return gulp.src(vendorScriptsPaths)
    .pipe(plumber())
    .pipe(concat("vendor.js"))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/*.ico"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", "css", "vendorScripts", "scripts", "sprite", "img", "webp", "html"));
gulp.task("start", gulp.series("build", "server"));
