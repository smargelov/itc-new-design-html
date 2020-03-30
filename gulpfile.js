"use strict";

global.$ = {
    path: {
        task: require('./gulp/path/tasks.js')
    },
    gulp: require('gulp'),
    browserSync: require('browser-sync').create(),
    del: require('del')
};

$.path.task.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'fonts',
        'inc',
        'styles:dev',
        'styles:lib',
        'img:dev',
        'libsJS:dev',
        'js:dev',
        'jserv',
        'svg'
    )
));

$.gulp.task('build', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'fonts',
        'inc',
        'styles:build',
        'styles:lib',
        'img:build',
        'libsJS:build',
        'js:build',
        'svg'
    )
));

$.gulp.task('build-min', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'fonts',
        'inc',
        'styles:build-min',
        'styles:lib',
        'img:build',
        'libsJS:build',
        'js:build-min',
        'svg'
    )
));

$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));