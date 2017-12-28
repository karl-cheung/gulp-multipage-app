import gulp from 'gulp'
import mkdirp from 'mkdirp'
import del from 'del'
import requireDir from 'require-dir'
import runSequence from 'run-sequence'
import shell from 'gulp-shell'

import config from './config/index'

requireDir('./tasks')

gulp.task('clean', () => del(['dist', 'dev']))

gulp.task('shell', shell.task('echo You can start to run a shell.'))

gulp.task('dev', ['dev:img', 'dev:css', 'dev:js', 'dev:html'])

gulp.task('default', () => {
  return runSequence(
    'clean',
    ['dev:img', 'dev:css', 'dev:js', 'dev:html'],
    ['build:img', 'build:css', 'build:js', 'build:html'],
    'rev',
    'shell'
  )
})

gulp.task('init', () => {
  const dirs = [config.paths.src + config.paths.img, config.paths.src + config.paths.css, config.paths.src + config.paths.js, config.paths.src + config.paths.html]
  dirs.forEach(dir => {
    mkdirp.sync(dir)
  })
})