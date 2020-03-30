const plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    csscomb = require('gulp-csscomb'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    mmq = require('gulp-merge-media-queries'),
    stylesPATH = {
        "input": "./dev/static/styles/",
        "output": "./build/css/"
    };

module.exports = function () {
    $.gulp.task('styles:dev', () => {
        return $.gulp.src(stylesPATH.input + 'styles.sass')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 3 versions']
            }))
            .pipe(sourcemaps.write())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
            .on('end', $.browserSync.reload);
    });
    $.gulp.task('styles:build', () => {
        return $.gulp.src(stylesPATH.input + 'styles.sass')
            .pipe(sass())
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 3 versions']
            }))
            .pipe(autoprefixer())
            .pipe(mmq())
            .pipe(csscomb())
            .pipe($.gulp.dest(stylesPATH.output))
    });
    $.gulp.task('styles:build-min', () => {
        return $.gulp.src(stylesPATH.input + 'styles.sass')
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(mmq())
            .pipe(csscomb())
            .pipe(csso())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
    });
    $.gulp.task('styles:lib', () => {
        return $.gulp.src(stylesPATH.input + 'libs.sass')
            .pipe(sass())
            .pipe(csso())
            .pipe(rename('libs.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
    });
};