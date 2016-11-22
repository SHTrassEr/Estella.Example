/// <binding />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var insert = require('gulp-insert');

var nodeJsModuleDeclaration = '\ndeclare module \'Estella.Example.AirHockey/Server\' { export default Estella; }';
var useStrict = '\'use strict\';\n';

var importJsModule = 'var Estella = require(\'Estella.Core/Server\');\nvar Matter = require(\'matter-js/build/matter.js\');\nlet CircularJSON = require(\'circular-json\');\n';

var outLib = 'out/estella-example-air-hockey/lib';
var outTypings = 'out/estella-example-air-hockey/typings';
var outTest = 'out/estella-example-air-hockey/test';

var srcCorePath = 'src/Core/**/*.ts';
var srcServerPath = 'src/Server/**/*.ts';
var srcClientPath = 'src/Client/**/*.ts';
var srcTestPath = 'src/Test/**/*.ts';
var srcEngineCorePath = 'node_modules/estella-core/typings/estella-core-full.d.ts';
var libPath = 'lib/**/*.d.ts';

gulp.task('build-server', function () {
    var tsResult = gulp.src([srcEngineCorePath, libPath, srcCorePath, srcServerPath])
        .pipe(ts({
            declaration: true,
            removeComments: true,
            target: 'es6',
            outFile: 'estella-example-air-hockey-server.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict + importJsModule)).pipe(gulp.dest(outLib)),
        tsResult.dts.pipe(insert.append(nodeJsModuleDeclaration)).pipe(gulp.dest(outTypings))
    ]);
});

gulp.task('build-client', function () {
    var tsResult = gulp.src([srcEngineCorePath, libPath, srcCorePath, srcClientPath])
        .pipe(ts({
            declaration: true,
            removeComments: true,
            target: 'es6',
            outFile: 'estella-example-air-hockey-client.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict)).pipe(gulp.dest(outLib)),
        tsResult.dts.pipe(gulp.dest(outTypings))
    ]);
});

gulp.task('build-test', function () {
    var tsResult = gulp.src([srcTestPath])
        .pipe(ts({
            declaration: false,
            removeComments: true,
            target: 'es6',
            outFile: 'estella-example-air-hockey-test.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict)).pipe(gulp.dest(outTest))
    ]);
});

gulp.task('build-all', ['build-server', 'build-client', 'build-test']);

