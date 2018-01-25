import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'
import proxy from 'http-proxy-middleware'
import lazypipe from 'lazypipe'
import sass from 'gulp-sass-china'

import config from '../config/index'

const $ = gulpLoadPlugins()
const bs = browserSync.create()
const reload = bs.reload

gulp.task('dev:img', () => {
  return gulp.src([config.paths.src + config.paths.assetsImg])
  .pipe(gulp.dest(config.paths.dev + config.paths.img))
  .pipe(reload({ stream: true }))
})

const sassTasks = lazypipe()
.pipe((opt, cb) => {
  return sass(opt).on('error', cb)
}, { outputStyle: config.styleLoader.opt.outputStyle }, sass.logError)

const lessTasks = lazypipe()
.pipe((cb) => {
  return $.less().on('error', cb)
}, err => {
  console.log('Less Error!' + err)
})

const stylusTasks = lazypipe()
.pipe((cb) => {
  return $.stylus().on('error', cb)
}, err => {
  console.log('Stylus Error!' + err)
})

gulp.task('dev:css', () => {
  return gulp.src([config.paths.src + config.paths.assetsCss])
  .pipe($.if(config.cssSourceMap, $.sourcemaps.init()))
  .pipe(config.styleLoader.style === 'sass' ? sassTasks() : config.styleLoader.style === 'less' ? lessTasks() : config.styleLoader.style === 'stylus' ? stylusTasks() : '')
  .pipe($.autoprefixer(config.autoprefixer))
  .pipe($.if(config.cssSourceMap, $.sourcemaps.write('.')))
  .pipe(gulp.dest(config.paths.dev + config.paths.css))
  .pipe(reload({ stream: true }))
})

gulp.task('dev:js', () => {
  const f = $.filter(['**', `!${config.paths.src + config.paths.js}/**/*.min.js`], { restore: true })
  return gulp.src([config.paths.src + config.paths.assetsJs])
  .pipe(f)
  .pipe($.if(config.jsSourceMap, $.sourcemaps.init()))
  .pipe($.if(config.eslint, $.eslint()))
  .pipe($.if(config.eslint, $.eslint.format()))
  .pipe($.babel())
  .pipe($.if(config.jsSourceMap, $.sourcemaps.write('.')))
  .pipe(f.restore)
  .pipe(gulp.dest(config.paths.dev + config.paths.js))
  .pipe(reload({ stream: true }))
})

gulp.task('dev:html', () => {
  return gulp.src([config.paths.src + config.paths.assetsHtml])
  .pipe(gulp.dest(config.paths.dev + config.paths.html))
})

const assets = [`!${config.paths.src}${config.paths.img}/**/*`, `!${config.paths.src}${config.paths.css}/**/*`, `!${config.paths.src}${config.paths.js}/**/*`, `!${config.paths.src}${config.paths.html}/**/*`]

gulp.task('dev:assets', () => {
  return gulp.src([`${config.paths.src}/**/*`, ...assets])
  .pipe(gulp.dest(config.paths.dev))
})

gulp.task('dev', ['dev:img', 'dev:css', 'dev:js', 'dev:html', 'dev:assets'])

gulp.task('watch', () => {
  gulp.watch(config.paths.src + config.paths.assetsImg, ['dev:img'])
  gulp.watch(config.paths.src + config.paths.assetsCss, ['dev:css'])
  gulp.watch(config.paths.src + config.paths.assetsJs, ['dev:js'])
  gulp.watch([`${config.paths.src}/**/*`, ...assets])
  gulp.watch(config.paths.src + config.paths.assetsHtml, ['dev:html']).on('change', reload)
})

const server = {
  baseDir: config.server.baseDir,
  index: config.server.index,
  middleware: [proxy('/api', { target: config.server.target, changeOrigin: true, pathRewrite: { '^/api': '' } })]
}
gulp.task('server', ['dev'], () => {
  bs.init({
    server: server
  })
  gulp.start('watch')
})