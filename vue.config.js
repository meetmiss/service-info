// const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require("compress-webpack-plugin")
module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "static",
    lintOnSave: true,
    runtimeCompiler: true,
    productionSourceMap: false,
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 查看打包文件体积
            // config.plugins.push(new WebpackBundleAnalyzerPlugin())
            config.plugins.push(new CompressionPlugin({
                algorithm: "gzip",
                test: new RegExp("\\.(js|css)$"), // 匹配文件名
                threshold: 10240, // 对超过10k的数据进行压缩
                minRatio: 0.8,
                deleteOriginalAssets: false // 是否删除原文件
            }))
        } else if (process.env.NODE_ENV === "development") {
            // 为开发环境修改配置...
        }
        config.entry.app = ["babel-polyfill", "./src/main.js"];
    },
    devServer: {
        open: true, // 自动打开浏览器
        hot: true, // 热加载
        host: '0.0.0.0', // ip地址
        // port: 9090, // 端口
        // https: false,  //false关闭https,true为开启
        hotOnly: false,
        // proxy: null, // 处理跨域问题
        proxy: {
            "/api": {
                // target: 'http://10.20.69.229:8080',
                target: 'http://10.40.25.96:8888',// 测试服务器
                // target: 'http://10.28.102.187:8888',// 郭阳奇
                // target: 'http://10.28.102.190:8080',// 刘书宇
                // target: 'http://10.1.64.154/MDRSC',// 正式服务器
                pathRewrite: {
                  "^/api": "/"
                },
                changeOrigin: true
            }
        },
        historyApiFallback: {
            index: '/index.html' // index.html为当前目录创建的template.html
        }
    }
}
