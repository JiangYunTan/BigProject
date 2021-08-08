$(function() {
  // 表单监听
  $('#formUpdatePwd').submit(function(e) {
    e.preventDefault();
    var password_v = $(this).serialize()
    // console.log(password_v);
    
    axios({
      method: 'PATCH',
      url: '/my/updatepwd',
      data: password_v
    }).then(({data:res}) => {
      if(res.code == 0) {
        layer.msg(res.message);
        // location.href = '/login.html'
        window.parent.location.href = '/login.html'
      }else {
        layer.msg(res.message);
      }
    },error => layer.msg('失败'))

  })
  // 正则密码
  layui.form.verify({
    pass: [
      /^[\S]{6,15}$/,
      '密码必须6到15位，且不能出现空格'
    ],
    alike:function(value,item) {

      if(value == $('.ymm').val()) {
        return '新密码不能与原密码相同'
      }
    },
    equal:function(value,item) {

      if(value !== $('.xmm').val()) {
        return '必须与新密码相同'
      }
    } 
  })
})
