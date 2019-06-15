const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const htmlReplace = require('gulp-html-replace');
const htmlMin = require('gulp-htmlmin');
const del = require('del');

const config = {
    dist: 'dist',
    src: 'src',
    cssin: 'src/css/**/*.css',
    jsin: 'src/js/**/*.js',
    imgin: 'src/img/**/*.{jpg,jpeg,png,gif}',
    htmlin: 'src/*.html',
    scssin: 'src/scss/**/*.scss',
    cssout: 'dist/css',
    jsout: 'dist/js',
    imgout: 'dist/img',
    htmlout: 'dist/',
    scssout: 'src/css/',
    cssoutname: 'style.css',
    jsoutname: 'script.js',
    cssreplaceout: 'css/style.css',
    jsreplaceout: 'js/script.js'
};

gulp.task('sass', () => {
    return gulp.src(config.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scssout))
    .pipe(browserSync.stream());
});

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('serve', gulp.series('sass', () => {
    browserSync({
        server: config.src
    });

    gulp.watch([config.htmlin, config.jsin], gulp.series('reload'));
    gulp.watch(config.scssin, gulp.series('sass'));
}));

gulp.task('css', () => {
    return gulp.src(config.cssin)
    .pipe(concat(config.cssoutname))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.cssout));
});

gulp.task('js', () => {
    return gulp.src(config.jsin)
    .pipe(concat(config.jsoutname))
    .pipe(uglify())
    .pipe(gulp.dest(config.jsout));
});

gulp.task('img', () => {
    return gulp.src(config.imgin)
    .pipe(changed(config.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgout));
});

gulp.task('html', () => {
    return gulp.src(config.htmlin)
    .pipe(htmlReplace({
        'css': config.cssreplaceout,
        'js': config.jsreplaceout
    }))
    .pipe(htmlMin({
     sortAttributes: true,
     sortClassName: true,
    //  collapseWhitespace: true
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('clean', () => {
    return del([config.dist]);
});

gulp.task('build', () => {
    gulp.series('clean', gulp.parallel('html', 'js', 'css', 'img'));
});

gulp.task('default', gulp.series('serve'));