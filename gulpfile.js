const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const StaticServer = require('./server.js');

async function styles() {
    return gulp.src(['stage/css/**/*.css', 'stage/css/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload())
}

// gulp.task('html', function () {
//     return gulp.src('stage/html/*.pug')
//         .pipe(pug({
//             pretty: true
//         }))
//         .pipe(gulp.dest('dist'))
//         .pipe(livereload())
// });


async function html() {
    return gulp.src('stage/html/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
}

async function js() {
    return gulp.src('stage/js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload())
}

async function watch() {
    livereload.listen();
    gulp.watch(['stage/css/**/*.css', 'stage/css/**/*.scss'], styles);
    gulp.watch('stage/html/**/*.pug', html);
    gulp.watch('stage/js/*.js', js);
}


exports.default = gulp.series(
    html,
    watch
)