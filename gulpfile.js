const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
// const svgstore = require('gulp-svgstore');
// const posthtml = require('gulp-posthtml');
const del = require('del');
const run = require('run-sequence');


gulp.task('html', () => {
    gulp.src('src/*html')
        // .pipe(posthtml([
        //     include()
        // ]))
        .pipe(gulp.dest('build'))
});

gulp.task('style', () => {
    gulp.src('src/scss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('build/css'))
        .pipe(minify())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build/css'))
        
        .pipe(server.stream());
});
    
gulp.task('images', () => {
    return gulp.src('src/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});
    
// gulp.task('sprite', () => {
//     return gulp.src('src/img/icon-*.svg')
//         .pipe(svgstore({
//             inlineSvg: true
//         }))
//         .pipe(rename('sprite.svg'))
//         .pipe(gulp.dest('build/img'));
// });

gulp.task('serve', () => {
    server.init({
        server: 'build/'
    })

    gulp.watch('src/scss/**/*.scss', ['style']);
    gulp.watch('src/*.html', ['html']).on('change', server.reload);
});

gulp.task('copy', () => {
    return gulp.src([
            'src/fonts/**/*.{woff,woff2}',
            // 'src/img/**',
            'src/js/**'
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
    return del('build');
});

gulp.task('build', (done) => {
    run(
        'clean',
        'copy',
        'images',
        'style',
        // 'sprite',
        'html',
        done
    );
});