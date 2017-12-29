import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

import config from '../config/index'

const $ = gulpLoadPlugins()

gulp.task('build:img', () => {
  return gulp.src([config.paths.dev + config.paths.assetsImg])
  .pipe($.cache($.imagemin(config.imagemin)))
  .pipe($.if(!config.revAppend, $.rev()))
  .pipe(gulp.dest(config.paths.dist + config.paths.img))
  .pipe($.if(!config.revAppend, $.rev.manifest()))
  .pipe($.if(!config.revAppend, gulp.dest(`${config.paths.dev}/rev${config.paths.img}`)))
})

gulp.task('build:css', () => {
  return gulp.src([`${config.paths.dev + config.paths.css}/**/*.css`])
  .pipe($.cleanCss())
  .pipe($.if(!config.revAppend, $.rev()))
  .pipe(gulp.dest(config.paths.dist + config.paths.css))
  .pipe($.if(!config.revAppend, $.rev.manifest()))
  .pipe($.if(!config.revAppend, gulp.dest(`${config.paths.dev}/rev${config.paths.css}`)))
})

gulp.task('build:js', () => {
  const f = $.filter(['**', `!${config.paths.dev + config.paths.js}/**/*.min.js`], { restore: true })
  return gulp.src([config.paths.dev + config.paths.assetsJs])
  .pipe(f)
  .pipe($.uglify())
  .pipe($.if(!config.revAppend, $.rev()))
  .pipe(f.restore)
  .pipe(gulp.dest(config.paths.dist + config.paths.js))
  .pipe($.if(!config.revAppend, $.rev.manifest()))
  .pipe($.if(!config.revAppend, gulp.dest(`${config.paths.dev}/rev${config.paths.js}`)))
})

gulp.task('build:html', () => {
  return gulp.src([config.paths.dev + config.paths.assetsHtml])
  .pipe($.if(config.revAppend, $.revAppend()))
  .pipe($.htmlmin(config.htmlmin))
  .pipe(gulp.dest(config.paths.dist + config.paths.html))
})

gulp.task('build', ['build:img', 'build:css', 'build:js', 'build:html'])

gulp.task('rev', () => {
  if (config.revAppend) return
  return gulp.src([`${config.paths.dev}/rev/**/rev-manifest.json`, config.paths.dist + config.paths.assetsHtml])
  .pipe($.revCollector({
    replaceReved: true
  }))
  .pipe(gulp.dest(config.paths.dist + config.paths.html))
})