const resolve = require('path').resolve


module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: [ '/www/wwwroot/main.js' ],
  output: {
    filename: "main.js",
    path: resolve(__dirname, './../dist')
  }
}
