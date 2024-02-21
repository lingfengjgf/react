const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (isDev) {
  return {
    // 1 输入输出部分
    entry: path.resolve(__dirname, "../src/index.tsx"),
    output: {
      // 打包输出路径
      path: path.resolve(__dirname, "../dist"),
      // 每个输出的js名称  
      // hash contenthash chunkhash 三者的区别？
      filename: "static/js/[name].[hash:8].js",
      // 构建前删除 dist webpack5内置，webpack4 clean-webpack-plugin
      clean: true, 
      // 打包后的文件的公共前缀路径
      publicPath: "/"
    },

    // 2 resolve 
    // 优化搜索、依赖项，在引入模块时可以不加后缀，可能会影响构建性能
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },

    // 3 loader 解析各种 import from 文件
    // 针对不同的文件，需要不同的处理方法，需要有一个解析器识别文件内容，从而保证最后可以形成一个 bundle

    module: {
      rules: [
        { test: /\.(tsx|ts)$/, use: { loader: "babel-loader" } },
        // post-css-loader: 处理语法转换
        // css-loader: 处理 <link> 路径
        // style-loader: 将 css 属性放到 <style> 标签里，开发环境方便热替换
        // MiniCssExtractPlugin 生产环境将css单独抽离出来，方便文件缓存
        { 
          // 下面的只要匹配到一个就行
          oneOf: [
            // 定义一个模块化规则，将 xxx.module.(css|less) 单独处理
            { 
              test: /\.module\.(css|less)$/, 
              include: [path.resolve(__dirname, '../src')],
              use: [
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                {
                  loader: "css-loader",
                  options: {
                    modules: {
                      // 借助css-module，实现 BEM 风格
                      localIdentName: "[path][name]__[local]--[hash:base64:5]"
                    }
                  }
                },
                "postcss-loader"
              ] 
            },
            { 
              test: /\.css$/, 
              use: [
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
                "less-loader"
              ] 
            },
            { 
              test: /\.less$/, 
              use: [
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
                "less-loader"
              ] 
            },
          ]
        },
        // 部分文件的处理 5 内置了，之前需要用 url-loader file-loader
        {
          test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
          generator: {
            filename: "static/images/[name].[contenthash:8][ext]"
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          generator: {
            filename: "static/font/[name].[contenthash:8][ext]"
          }
        },
        {
          test: /\.(mp4|mp3|flv|wav)$/,
          generator: {
            filename: "static/media/[name].[contenthash:8][ext]"
          }
        },
      ]
    },

    // plugins
    plugins: [
      new HtmlWebpackPlugin({
        // 将js 和 css 注入到html模板
        template: path.resolve(__dirname, "../public/index.html"),
        // 自动注入资源文件
        inject: true
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? "static/css/[name].css" : "static/css/[name].[contenthash:4].css"
      })
    ]
  }
}