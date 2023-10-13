module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://1.116.64.64:5004/api2/',
                changeOrigin: true,  // 是否跨域，虚拟的站点需要更改origin
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}