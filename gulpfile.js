/*!
 * gulp
 * npm install gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */
 
// Load plugins
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    //sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    gls = require('gulp-live-server'),
    stylish = require('jshint-stylish'),
    vendor = require('gulp-concat-vendor');

gulp.task('templates', function() {
  gulp.src('src/templates/**/*.jade')
    .pipe(jade())
    //.pipe(rename({ suffix: '.html' }))
    .pipe(gulp.dest('docs/count/'));
    
})

gulp.task('styles', function() {
  gulp.src('src/styles/**/*.sass')
  //return sass('src/styles/', { style: 'compressed', stopOnError: false })
    .pipe(sass({ style: 'compressed', errLogToConsole: true, indentedSyntax: true }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('docs/count/styles'));
    //.pipe(notify({ message: 'Styles task complete' }));
});




gulp.task('scripts', function() {

  gulp.src('bower_components/*/dist/*.min.js')
    .pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
    .pipe(vendor('vendor.js'))
    //.pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('docs/count/scripts/vendor/'));


  gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc', {fail: true}))
    .pipe(jshint.reporter(stylish))
    //.pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
    .pipe(gulp.dest('docs/count/scripts'));
    //.pipe(notify({ message: 'Scripts task complete' }));

});
 
 
// Clean
// gulp.task('clean', function(cb) {
//     del(['dist/css', 'dist/js'], cb)
// });
 
// Default task


gulp.task('serve', function() {

    var server = gls.static('docs', 8888);
    server.start();
    gulp.watch(['docs/**']).on('change', server.notify);

});


gulp.task('default', function() {
    gulp.start('serve', 'styles', 'scripts', 'templates', 'watch');
});
 
gulp.task('watch', function() {

  gulp.watch('src/styles/**/*.sass', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/templates/**/*.jade', ['templates']);

 
});

