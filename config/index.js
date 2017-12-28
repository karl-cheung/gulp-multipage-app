const init = {
  src: 'src',
  dev: 'dev',
  dist: 'dist',
  img: '/img',
  css: '/css',
  js: '/js',
  html: '/html'
}

const styleLoader = {
  style: 'sass',
  opt: {
    outputStyle: 'expanded'
  }
}

const suffix = styleLoader.style === 'sass' ? '+(sass|scss)' : styleLoader.style === 'stylus' ? 'styl' : styleLoader.style

export default {
  paths: {
    src: init.src,
    dev: init.dev,
    dist: init.dist,
    img: init.img,
    assetsImg: init.img + '/**/*.+(jpg|jpeg|png|gif|ico)',
    css: init.css,
    assetsCss: init.css + '/**/*.' + suffix,
    js: init.js,
    assetsJs: init.js + '/**/*.js',
    html: init.html,
    assetsHtml: init.html + '/**/*.html'
  },
  imagemin: {
    optimizationLevel: 5,
    progressive: true,
    interlaced: true,
    multipass: true
  },
  styleLoader: styleLoader,
  autoprefixer: {
    browsers: [
      'last 3 versions',
      'chrome >= 34',
      'safari >= 6',
      'ios >= 6',
      'android >= 4.4',
      'and_uc >= 9.9'
    ],
    cascade: true,
    remove: true
  },
  htmlmin: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
  },
  eslint: true,
  cssSourceMap: true,
  jsSourceMap: true,
  revAppend: false,
  server: {
    target: 'https://github.com/vincheung',
    baseDir: 'dev',
    index: 'html/index.html'
  }
}