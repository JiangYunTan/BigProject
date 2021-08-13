$(function () {
  var state = "已发布"
  $('.btn_cg').click(function () {
    state = "草稿"
  })
  $('.btn_pub').click(function () {
    state = "已发布"
  })
  // 获取文章列表分类
  function initialCanvasData() {
    axios({
      method: 'GET',
      url: '/my/cate/list'
    }).then(({data:res}) => {
      console.log(res.data);
      if(res.code == 0) {
        res.data.forEach(function (item) {
          console.log(item.cate_name);
          $('[name="cate_id"]').append(`
            <option value="${item.id}">${item.cate_name}</option>
          `)
        })
        $('.ql-toolbar select').attr('lay-ignore','')
        // 使用layui必须用来渲染一下
        layui.form.render('select')
        $('.ql-toolbar select').hide()
      }
    })
  }
  initialCanvasData()

  // 富文本区域
  var toolbarOptions = [['bold', 'italic'], ['link', 'image'], ['blockquote', 'code-block']];
  var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions
    }
  })

  // 封面选择
  $('.btn-choose-img').click(function() {
    $('#file').click()
  })

  // 监听选择框的change事件
  var file = null;
  $('#file').change(function(e) {
    v = e.target.files 
    if(v.length == 0) {
      return file = null
    }
    file = v[0]
    var img_URL =URL.createObjectURL(v[0])
      $('#image').attr('src', img_URL) 
  })

  // 监听表单事件submit
  
  $('.form-pub').submit(res => {
    res.preventDefault()
    if(!v) {
      return layer.msg('请选择文件封面')
    }

    // 上传数据 // 获取form数据
    var pub_v = new FormData()
    pub_v.append('title' ,$('[name="title"]').val())
    pub_v.append('cate_id', $('[name="cate_id"]').val())
    pub_v.append('content' , quill.root.innerHTML)
    pub_v.append('state', state)
    pub_v.append('cover_img' ,file)
    // axios 发布文章
    axios({
      method: 'POST',
      url: '/my/article/add',
      data: pub_v
    }).then(({data:res}) => {
      if(res.code == 0) {
        layer.msg(res.message)
        location.href='/article/article.html'
        window.parent.Jclass('文章列表')
      }else {
        layer.msg(res.message)
      }
    })
  })
  

  // 表单校验
  layui.form.verify({
    title: [
      /^.{1,30}$/,
      '标题必须是1~30位字符'
    ]
    
  })

})