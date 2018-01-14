var gulp = require('gulp'); 
var sass = require('gulp-sass') 
var sourceMaps = require('gulp-sourcemaps'); 



gulp.task ('sass', function() {
    return gulp.src('*.scss') 
        .pipe(sourceMaps.init()) 
        .pipe(sass({
            outputStyle: 'expanded'
        })) 
        .on('error', sass.logError)
        .pipe(sourceMaps.write()) 
        .pipe(gulp.dest('css'))
});



gulp.task ('default', function() {
    gulp.start('sass');
    gulp.watch('*.scss', ['sass']) 
}) 