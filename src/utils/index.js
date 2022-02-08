import axios from 'axios';
// import qs from 'qs';
const http = {
  post: '',
  get: '',
  put: ''
};
http.post = function (api, data) {
  // let params = qs.stringify(data);
  return new Promise((resolve, reject) => {
    axios({
      baseURL: 'http://10.20.73.197:8128', // 测试使用
      url: api,
      method: 'post',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: '1'
      },
      data: data,
      timeout: 50000
    }).then(res => {
      if ((res.data.code && res.data.code !== 200) || (res.data.meta && res.data.meta.status !== 201)) {
        this.$message.warning(res.data.msg)
      }
      resolve(res)
    }).catch(error => {
      if (error.response && error.response.status === 500) {
        this.$message.error('服务器异常')
      }
      reject(error)
    })
  })
}
http.get = function (api, data) {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: 'http://10.20.73.197:8128', // 测试使用
      url: api,
      params: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: '1'
      },
      async:false,
    })
    .then(res => {
      if ((res.data.code && res.data.code !== 200) || (res.data.meta && res.data.meta.status !== 200)) {
        this.$message.warning(res.data.msg)
      }
      resolve(res)
    }).catch(error => {
      if (error.response && error.response.status === 500) {
        this.$message.error('服务器异常')
      }
      reject(error)
    })
  })
}
http.put = function (api, data) {
  // let params = qs.stringify(data);
  return new Promise((resolve, reject) => {
    axios({
      url: api,
      method: 'put',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 1
      },
      data: data
    }).then(res => {
      resolve(res)
    }).catch(error => {
      if (error.response && error.response.status === 500) {
        this.$message.error('服务器异常')
      }
      reject(error)
    })
  })
}
export default http;
