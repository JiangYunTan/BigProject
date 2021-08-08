$(function() {

  // 点击选择头像图片
  $('#btnChooseImg').click(function() {
    $('#file').click()
  })
  // 监听文件选择器的change事件
  var imgFL = null;
  $('#file').change(function(e) {
    console.log(e.target.files[0]);
    imgFL = e.target.files[0];
    // URL.createObjectURL() 返回值是文件的url地址
    imgURL = URL.createObjectURL(e.target.files[0]);
    $('#image').attr('src', imgURL);
  })
  
  // 上传头像监听
  $('#btnUploadImg').click(function(e) {
    console.log(imgURL);
    // new 一个 FileeReader()方法
    var fl = new FileReader();
    var pic_v = null;
    fl.readAsDataURL(imgFL)
    fl.onload = function() {
      console.log( fl.result);
      pic_v = fl.result;

      // axios url地址
      axios({
        method: 'PATCH',
        url: '/my/update/avatar',
        data: {
          avatar: pic_v
        }
      }).then(({data:res}) => {
        console.log(res);
        if(res.code == 0) {
          layer.msg(res.message);
          window.parent.userNews()
        }else {
          layer.msg(res.message);
        }
      })
    }

    
  })


})