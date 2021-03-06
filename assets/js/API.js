 //  axios url地址
 axios.defaults.baseURL = 'http://www.liulongbin.top:3008'
// 请求拦截器
 axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
// console.log(config);
  if(config.url.indexOf('/my')!== -1) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});