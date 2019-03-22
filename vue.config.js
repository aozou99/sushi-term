const path = require("path");
module.exports = {
  publicPath: "./",

  configureWebpack: {
    resolve: {
      alias: {
        modules: path.resolve(__dirname, "src/modules")
      }
    }
  }
};
