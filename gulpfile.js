// Définition des dépendances
// voir branche bundler pour essaie avec importation des fichiers

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));


//Taches pour developper

gulp.task('pull-modules', function(){
    
    return gulp.src('./node_modules/@iconify/iconify/dist/iconify.min.js').pipe(gulp.dest('./src/assets/scripts/'));

});

gulp.task('browser-sync', function(){

    browserSync.init({
        server:{
            baseDir: "./src/"
        }
    });

});

gulp.task('sass', function(){

    gulp.src('./src/assets/styles/scss/**/*.scss').pipe(sass()).pipe(gulp.dest('./src/assets/styles/css/')).pipe(browserSync.reload({stream : true})); 
    return gulp.src('./scss/*.scss').pipe(sass()).pipe(gulp.dest('./src/assets/styles/css/')).pipe(browserSync.reload({stream : true}));

});

gulp.task('watch-sass', function() {

    gulp.watch('src/assets/styles/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('scss/*.scss', gulp.series('sass'));

});

gulp.task('watch-html', function() {

    gulp.watch('src/**/*.html').on('change', browserSync.reload);

});

gulp.task('watch-scripts', function() {

    gulp.watch('src/assets/scripts/**/*.js').on('change', browserSync.reload);

});

//Taches pour builder

gulp.task('build-fonts', function(){

    return gulp.src('src/assets/fonts/**/*').pipe(gulp.dest('dist/assets/fonts'))

})

gulp.task('build-img', function(){

    return gulp.src('src/assets/images/**/*').pipe(gulp.dest('dist/assets/images'))

})

gulp.task('build-scripts', function(){

    return gulp.src('src/assets/scripts/**/*.js').pipe(gulp.dest('dist/assets/scripts'))

})

gulp.task('build-styles', function(){

    return gulp.src('src/assets/styles/css/**/*.css').pipe(gulp.dest('dist/assets/styles/css'))

})

gulp.task('build-template', function(){

    return gulp.src('src/**/*.html').pipe(gulp.dest('dist/'))

})

// Taches syntheses

gulp.task('dev', gulp.series('sass', gulp.parallel('watch-sass', 'watch-scripts', 'watch-html', 'browser-sync')));

// gulp.task('dev', gulp.series('sass', 'watch-sass')); // pour travailler avec live server de vscode

gulp.task('build', gulp.series('build-fonts', 'build-img', 'build-scripts','build-styles', 'build-template'));