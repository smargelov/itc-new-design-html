let jsonServer = require("gulp-json-srv"),
    jserver = jsonServer.create({
        port: 3002
    });

module.exports = function () {
    $.gulp.task('jserv', () => {
        return $.gulp.src('data.json')
            .pipe(jserver.pipe());
    });
};