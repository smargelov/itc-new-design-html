let plumber = require('gulp-plumber'),
    pug = require('gulp-pug'),
    pugbem = require('gulp-pugbem'),
    cached = require('gulp-cached');
    pugbem.b = true;

module.exports = function () {
    $.gulp.task('pug', () => {
        return $.gulp.src('./dev/pug/*.pug')
            .pipe(plumber())
            .pipe(pug({
                pretty: true,
                plugins: [pugbem]
            }))
            .pipe(plumber.stop())
            .pipe(cached('pug'))
            .pipe($.gulp.dest('./build/'))
            .on('end', $.browserSync.reload);
    });
};
