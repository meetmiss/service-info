import axios from 'axios'
// import qs from 'qs'
// import router from "../router";
import Vue from 'vue'

const service = axios.create({
    // baseURL: 'http://10.20.69.229:8080',
    timeout: 50000
})

// TODO
/* const toLogin = () => {
    router.push("/login");
};
const errorHandle = (status) => {
    switch (status) {
      case 400:
        // console.log("请求信息发生错误");
        break;
      case 401:
        // console.log("用户信息验证失败:token验证失败");
        localStorage.clear();
        toLogin();
        break;
      case 403:
        // console.log("请求被限制");
        localStorage.clear();
        toLogin();
        break;
      case 404:
        // console.log("客户端错误");
        break;
      default:
        // console.log(other);
        break;
    }
}; */

service.interceptors.request.use(config => {
    // if (config.method === 'get') {
    //     config.data = qs.stringify(config.data)
    // } else if (config.method === 'post') {
    //     config.data = qs.parse(config.data)
    // }
    config.headers = {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: '1'
    }
    return config
}, error => {
    return Promise.reject(error)
})
service.interceptors.response.use(response => {
    // response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
    return response
}, error => {
    const { response } = error
    if (response.status === 500) {
        Vue.prototype.$message.error('服务器异常')
    }
    // errorHandle(response.status, response.data); // TODO
    return Promise.reject(error)
})
export default service
