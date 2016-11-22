/// <binding />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var insert = require('gulp-insert');


gulp.task('copy-air-hockey', [], function () {
    return merge([
        gulp.src('../AirHockey/npm/package.json').pipe(gulp.dest('node_modules/estella-example-air-hockey/')),
        gulp.src('../AirHockey/out/estella-example-air-hockey/lib/*').pipe(gulp.dest('node_modules/estella-example-air-hockey/lib/')),
        gulp.src('../AirHockey/out/estella-example-air-hockey/typings/*').pipe(gulp.dest('node_modules/estella-example-air-hockey/typings/')),
        gulp.src('../AirHockey/out/estella-example-air-hockey/lib/estella-example-air-hockey-client.js').pipe(gulp.dest('public/javascripts/Estella/')),
    ]);
});


gulp.task('copy-tanks', [], function () {
    return merge([
        gulp.src('../Tanks/npm/package.json').pipe(gulp.dest('node_modules/estella-example-tanks/')),
        gulp.src('../Tanks/out/estella-example-tanks/lib/*').pipe(gulp.dest('node_modules/estella-example-tanks/lib/')),
        gulp.src('../Tanks/out/estella-example-tanks/typings/*').pipe(gulp.dest('node_modules/estella-example-tanks/typings/')),
        gulp.src('../Tanks/out/estella-example-tanks/lib/estella-example-tanks-client.js').pipe(gulp.dest('public/javascripts/Estella/')),
    ]);
});



gulp.task('copy-all', ['copy-air-hockey', 'copy-tanks']);

