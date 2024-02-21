const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig(true), {
  // 开发环境
  mode: "development",
  devtool: "eval-cheap-module-source-map", // 源码调试
  devServer: {
    port: 3000,
    compress: false, // 不压缩，热更新更快
    hot: true, // 热更新
    historyApiFallback: true, // 解决开发环境下，history路由 404 问题
    static: {
      directory: path.join(__dirname, "../public"), // 托管静态资源
    }
  }
})