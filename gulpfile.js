var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('webpackdev', function() {
  return gulp.src('src/js/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {test: /\.jsx$/, loader: 'jsx-loader'}
        ] 
      },
      watch: true
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['copy', 'webpackdev']);
gulp.task('default', ['build']);
