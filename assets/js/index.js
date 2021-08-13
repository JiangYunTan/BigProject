
  // 点击退出 弹出提示框
  $('.logout').click(function() {
    // 弹出框
    layer.confirm('确定退出账号么?', {icon: 3, title:'提示'}, function(index){
      //do something
      // 移除token 跳转到登录页
      localStorage.removeItem('token')
      location.href = "login.html"
      // 点击确定自动关闭
      layer.close(index);
    });
  })

  // 获取用户信息
  function userNews() {
    axios({
      method: 'GET',
      url: '/my/userinfo',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(({data:res}) => {
      // console.log('获取成功',res);
      // 渲染页面
      Jpave(res)
    },(error) => {
      console.log('获取失败',error);
      if(error.response.status == 401) {
        localStorage.removeItem('token')
        location.href = 'login.html'
      }  
    })
  }
  userNews();

  // 渲染页面个人信息
  function Jpave(res) {   
    // 判断用户头像是否存在
    if(res.data.user_pic) {
      // 顶部区域信息
      // 找到name头字母并大写res.data.username.charAt(0).toUpperCase()
      $('#header-avatar').html(`
        <img src="${res.data.user_pic}"class="layui-nav-img">
            个人中心
      `)
      // 侧部区域信息
      $('.user-info-box').html(`
        <img src="${res.data.user_pic}" class="layui-nav-img">
        <span class="welcome">&nbsp;欢迎&nbsp;${res.data.nickname}</span>
      `)
    }else {
      // 顶部区域信息
      $('#header-avatar').html(`
          <div class="text-avatar">${res.data.username.charAt(0).toUpperCase()}</div>
          个人中心
      `)
      // 侧部区域信息
      $('.user-info-box').html(`
        <div class="text-avatar">${res.data.username.charAt(0).toUpperCase()}</div>
        <span class="welcome">&nbsp;欢迎&nbsp; ${res.data.nickname}</span>
      `)
    }
    // 渲染完成后利用layui的动态效果
    layui.element.render('nav','nav1');
  }

  // 高亮显示 在publish。js 中调用
  function Jclass(KW) {
    $('dd').removeClass('layui-this')
    $(`dd:contains(${KW})`).addClass('layui-this')
  }
