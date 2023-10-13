import axios from 'axios'
import { getToken } from '@/utils/setToken.js'
import { Message } from 'element-ui'


// axios二次封装
const service = axios.create({
    baseURL: '/api',  //baseURL会自动加在请求地址上
    timeout: 3000   //如果请求超过3s，请求会中断

})

// 添加请求拦截器
service.interceptors.request.use(config => {
    // 在请求之前做些什么（获取token,在请求头设置token)
    config.headers['token'] = getToken('token')   //因为localStorage存的数据都是字符串类'xx'='yy'
    return config
}, error => {
    // 返回一个带有拒绝原因error的 Promise 对象
    return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(response => {
    // 对响应数据做些什么
    let { status, message } = response.data
    if (status !== 200) {
        // 消息提示框
        Message({ message: message || 'error', type: 'warning' })
    }
    return response
}, error => {
    return Promise.reject(error)
})

export default service