const {
    defineConfig
} = require('@vue/cli-service')

module.exports = {
    transpileDependencies: true,
    // 关闭eslint
    lintOnSave: false,
    // 代理服务器
    devServer: {
        historyApiFallback: true,
        // 配置启动端口
        port: process.env.VUE_APP_PORT,
        proxy: {
            // 路由前缀
            '/api': {
                target: 'http://localhost:9000',
                // 重写target服务器url，正则匹配，通常只需要匹配前缀，请求时把前缀重写去掉
                pathRewrite: {
                    '^/api': ''
                },
                // 是否开启websocket
                ws: true,
                //是否改变来源，false表示实际来源，不改变
                changeOrigin: false
            },
        }
    }
}