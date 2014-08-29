var gulp         =  require('gulp'),
    sass         =  require('gulp-ruby-sass'),
    autoprefixer =  require('gulp-autoprefixer'),
    minifycss    =  require('gulp-minify-css'),
    concat       =  require('gulp-concat'),
    rename       =  require('gulp-rename'),
    uglify       =  require('gulp-uglify'),
    clean        =  require('gulp-clean'),
    notify       =  require('gulp-notify'),

    livereload   =  require('gulp-livereload'),
		watch        =  require('gulp-watch'),
    lr           =  require('tiny-lr'),
    server       =  lr(),

    packer       = require('gulp-packer'),
    streamify    = require('gulp-streamify'),
    size         = require('gulp-filesize'),
    image        = require('gulp-image')
    ;

//compile master scss
gulp.task('styles',function(){
	return gulp.src('child/css/self/master.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(size())
    .pipe(gulp.dest('child/css/self'))
    .pipe(livereload())
    // .pipe(notify({ message: 'sass --> css complete' }));
});

//compile partial scss
gulp.task('partial',function(){
  return gulp.src('child/css/self/master.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(size())
    .pipe(gulp.dest('child/css/self'))
    .pipe(livereload())
    // .pipe(notify({ message: 'partial sass complete' }));
});

// minify javascript task
gulp.task('scripts', function() {
    return gulp.src('child/js/self/main_ajax.js')
      .pipe(concat('main_ajax.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest('child/js/self'))
        .pipe(livereload())
        // .pipe(notify({ message: 'Javascript completed' }));
});


gulp.task('html', function() {
  return gulp.src('*.html', {read: false})
    .pipe(watch())
    .pipe(livereload());
});

gulp.task('php', function() {
  return gulp.src('*.php', {read: false})
    .pipe(watch())
    .pipe(livereload());
});

gulp.task('image', function () {
  gulp.src('child/img/*')
    .pipe(image())
    .pipe(gulp.dest('child/img/compr'));
});


gulp.task('default',['scripts','image'], function() {
	gulp.watch('child/css/self/content/*.scss',function() {
   gulp.run('partial');
 });

  gulp.watch('child/css/self/master.scss',function() {
	gulp.run('styles');
	});

  gulp.watch('child/js/self/main_ajax.js',function() {
  gulp.run('scripts');
  });

  gulp.watch('index.html',function() {
  gulp.run('html');
  });

  gulp.watch('index.php',function() {
  gulp.run('php');
  });

});
