$(function() {
  //  axios url地址
  axios.defaults.baseURL = 'http://www.liulongbin.top:3008'
  
  // 获取用户信息
  function initUserInfo() {
    axios({
      method: 'GET',
      url: '/my/userinfo',
    }).then(({data:res}) => {
      console.log('获取成功',res);
      //给表单赋值
      layui.form.val("user-form", res.data);
     
    })
  }
  initUserInfo()
})