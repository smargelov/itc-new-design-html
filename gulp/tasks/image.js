const imagemin = require('gulp-imagemin'),
    buffer = require('vinyl-buffer'),
    imgPATH = {
        "input": ["./dev/static/images/**/*.{png,jpg,jpeg,webp,gif,svg}",
            '!./dev/static/images/svg/*'
        ],
        "output": "./build/images/"
    };

module.exports = function () {
    $.gulp.task('img:dev', () => {
        return $.gulp.src(imgPATH.input)
            .pipe($.gulp.dest(imgPATH.output));
    });

    $.gulp.task('img:build', () => {
        return $.gulp.src(imgPATH.input)
            // .pipe(buffer())
            // .pipe(imagemin([
            //     imagemin.gifsicle({interlaced: true}),
            //     imagemin.mozjpeg({
            //         quality: 75,
            //         progressive: true
            //     }),
            //     imagemin.optipng({optimizationLevel: 5}),
            //     imagemin.svgo({
            //         plugins: [
            //             {removeViewBox: true},
            //             {cleanupIDs: false}
            //         ]
            //     })
            // ]))
            .pipe($.gulp.dest(imgPATH.output));
    });

};
