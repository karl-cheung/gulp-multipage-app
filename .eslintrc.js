// http://eslint.org/docs/user-guide/configuring

module.exports = {
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "standard",
  "rules": {
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'quotes': 0,
    'eol-last': 0
  },
  "globals": {
    "$": true,
    "zepto": true,
    "Swiper": true
  }
}
