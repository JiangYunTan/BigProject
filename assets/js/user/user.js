$(function() {
  //  axios url地址
  axios.defaults.baseURL = 'http://www.liulongbin.top:3008'
  
  // 获取用户信息
  function initUserInfo() {
    axios({
      method: 'GET',
      url: '/my/userinfo',
    }).then(({data:res}) => {
      // console.log('获取成功',res);
      //给表单赋值
      layui.form.val("user-form", res.data);
     
    })
  }
  initUserInfo()

  // 校验规则更改用户个人信息
  layui.form.verify({
    nickname: [/^[a-zA-Z0-9_-]{2,5}$/],
    email: [/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/],
  })

  // 监听表单提交
  $('[lay-filter="user-form"]').submit(function(e) {
    e.preventDefault();
    var v =$(this).serialize();
    console.log(v);
    // 更新表单
    axios({
      method: 'PUT',
      url:'/my/userinfo',
      data: v
    }).then(({data:res}) => {
        if(res.code = 1) {
          layer.msg(res.message)
          console.log(222);
          // 调用其他函数中的函数方法
          window.parent.userNews()
        }else {
          layer.msg(res.message)
        }
    })
  })

  // 重置按键方法
  $('.layui-btn-primary').click(function(e) {
    e.preventDefault();
    initUserInfo()
  })
})