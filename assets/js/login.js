//  axios url地址
axios.defaults.baseURL = 'http://www.liulongbin.top:3008'
 
// 去注册
$('#link-login').click(function () {
  $('.login-box').show()
  $('.reg-box').hide();
})

// 去登陆
$('#link-reg').click(function () {
  $('.login-box').hide()
  $('.reg-box').show();
})

// 注册表单正则
layui.form.verify({ 
  username: [
    /^[a-zA-Z0-9]{1,10}$/,
    '用户名必须是1-10位数字和字母的组合'
  ],
  pass: [
    /^[\S]{6,15}$/,
    '密码必须6到12位，且不能出现空格'
  ],
  repwd:function(value,item) {
    var passValue = $('.reg-box [name="password"]').val()
    if(value !== passValue) {
      return '密码不一致'
    }
  }
});

// 表单注册监听
$('.reg-box form').submit(function(e) {
  e.preventDefault()
  var v = $(this).serialize()
  axios({
    method: 'POST',
    url:'/api/reg',
    data: v
  }).then(({data:res}) => {
    console.log(res);
    if(res.code == 0) {
      layer.msg('成功')

    }else if(res.code == 1){
      layer.msg(res.message)
    }
  })
})

// 表单登录监听
$('.login-box form').submit(function(e) {
  e.preventDefault()
  var v = $(this).serialize()
  axios({
    method: 'POST',
    url:'/api/login',
    data: v
  }).then(({data:res}) => {
    console.log(res);
    if(res.code == 0) {
      layer.msg(res.message)
      localStorage.setItem('token',res.token)
      location.href = '/index.html'

    }else if(res.code == 1){
      layer.msg(res.message)
      localStorage.removeItem('token')
    }
  })
})

