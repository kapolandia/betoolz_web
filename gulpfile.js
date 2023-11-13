const gulp = require('gulp');
const gulpSrc = require('gulp-src-ordered-globs');
const obfuscator = require('gulp-javascript-obfuscator');
const replace = require('gulp-replace');
const zip = require('gulp-zip');
const debug = require('gulp-debug')

gulp.task('move_non_js', () => {
    return gulpSrc(['public/**/*', '!./public/**/*.js',])
        .pipe(gulp.dest('tmp'));
});

gulp.task('move_ext', () => {
    return gulpSrc(['build/**/*'])
        .pipe(gulp.dest('tmp'));
})

gulp.task('obfuscate_js', () => {
    return gulp.src('./public/**/*.js').pipe(debug())
        // .pipe(replace('userkey', 'GNH5krj3jxkzSIrLYLEYSw'))

        .pipe(obfuscator({
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: false,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: false,
            debugProtectionInterval: 0,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            renameGlobals: false,
            rotateStringArray: false,
            selfDefending: false,
            shuffleStringArray: true,
            splitStrings: false,
            splitStringsChunkLength: 10,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            stringArrayThreshold: 0.75,
            stringArrayWrappersCount: 1,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersType: 'variable',
            transformObjectKeys: true,
            unicodeEscapeSequence: false,
            target: 'browser-no-eval'
        }))
        .pipe(gulp.dest('tmp'));
});

gulp.task('zip', () => {
    return gulp.src('./tmp/**/*')
        .pipe(zip('betools.zip'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series('move_ext', gulp.parallel('move_non_js', 'obfuscate_js'),
    // 'obfuscate_js_heavy',
    'zip'));