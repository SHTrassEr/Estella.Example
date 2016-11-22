/// <binding />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var insert = require('gulp-insert');


gulp.task('copy-air-hockey', [], function () {
    return merge([
        gulp.src('../AirHockey/out/estella-example-air-hockey/lib/estella-example-air-hockey-server.js').pipe(gulp.dest('node_modules/estella-example-air-hockey/lib/')),
        gulp.src('../AirHockey/out/estella-example-air-hockey/lib/estella-example-air-hockey-client.js').pipe(gulp.dest('node_modules/estella-example-air-hockey/lib/')),
        gulp.src('../AirHockey/out/estella-example-air-hockey/lib/estella-example-air-hockey-client.js').pipe(gulp.dest('public/javascripts/Estella/')),
    ]);
});



gulp.task('copy-all', ['copy-air-hockey']);

