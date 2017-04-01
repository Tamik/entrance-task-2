var gulp = require('gulp'),
	bs = require('browser-sync').create();
	//htmlmin = require('gulp-htmlmin'),

gulp.task('html', function() {
	gulp.src('./source/**/*.html')
		//.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./public'));
});

gulp.task('html-watch', ['html'], function(done) {
	bs.reload();
	done();
});

gulp.task('js', function() {
	gulp.src('./source/js/**/*.js')
		.pipe(gulp.dest('./public/js'));
});

gulp.task('js-watch', ['js'], function(done) {
	bs.reload();
	done();
});
gulp.task('serve', ['html', 'js', 'sass', 'imagemin'], function() {
	bs.init({
		server: {
			baseDir: './public'
		},
		notify: false
	});

	//gulp.watch('./source/**/*.html', ['html-watch']);
	gulp.watch('./source/js/**/*.js', ['js-watch']);
});

gulp.task('default', ['serve']);
