var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var gulpIf = require('gulp-if');
var browserSync = require('browser-sync').create();

var  config = {
    path: {
        scss: './src/scss/**/*.scss',
        html: './public/index.html'
},
    output:{
        cssName : 'bundle.min.css',
        path: './public'
},
    isDevelop: false
};


gulp.task('scss', function(){
    return gulp.src(config.path.scss)
    .pipe(gulpIf(config.isDevelop,sourcemaps.init()))
    .pipe(sass())
    .pipe(concat(config.output.cssName))
    .pipe(autoprefixer())
    .pipe(gulpIf(!config.isDevelop, cleanCss()))
    .pipe(gulpIf(config.isDevelop,sourcemaps.write()))
    .pipe(gulp.dest(config.output.path))
    .pipe(browserSync.stream());
})

gulp.task('serve',function(){
    browserSync.init({
        server:{
            baseDir: config.output.path
        }
    })
    gulp.watch(config.path.scss, gulp.series('scss')); //ымотрит за файлом scss
    gulp.watch(config.path.html).on('change',browserSync.reload);
})

gulp.task('default', gulp.series('scss','serve'));