const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ZipPlugin = require("../zipPlugin");

module.exports = merge(baseConfig(false), {
  // 生产环境
  mode: "production",
  optimization: {
    // 压缩
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        // 多线程并行压缩 js
        parallel: true,
        terserOptions: {
          compress: {
            pure_funcs: ["console.log", "console.warn"], // 移除log warn
          }
        }
      })
    ],

    // 代码动态分包
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /node_modules/,
          // minChunk: 3,   // 使用3次以上，才拆分成公共的
          // chunks: "initail", // initail: 只拆分初始化的，不管异步的  async: 只拆分异步的  all: 所有类型都拆分
          // minSize: 500   // 最小多大的文件才拆分
        },
        commons: {
          name: "commons"
        }
      }
    }
  },
  plugins:[
    new ZipPlugin({ filename: 'dist.zip'})
  ]
})