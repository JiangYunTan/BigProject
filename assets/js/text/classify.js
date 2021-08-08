$(function() {

  // 获取文章分类列表
  function initialise() {

    axios({
      method: 'GET',
      url: '/my/cate/list'
    }).then(({data:res}) => {
      // console.log(res.data);
      var list = res.data;
      list.forEach(function (item , index) {
        $('tbody').append(`
          <tr>
            <td>${index+1}</td>
            <td>${item.cate_name}</td>
            <td>${item.cate_alias}</td>
            <td>
              <button type="button" class="layui-btn layui-btn-xs btn-edit" data-myid = "${item.id}">修改</button>
              <button type="button" class="layui-btn layui-btn-danger layui-btn-xs btn-delete" data-myid = "${item.id}">删除</button>
            </td>
          </tr>
        `)
      })
    })
  }
  initialise();

  // 点击添加按钮
  $('#btnShowAdd').click(function() {
    layer.open({
      title: '添加文章分类',
      type: 1,
      content: $('#template_add').html(),
      area: ['400px', '230px']
    });

    $('#form-add').submit(function(e) {
      // console.log($(this).serialize());
      e.preventDefault();
      axios({
        method: 'POST',
        url: '/my/cate/add',
        data: $(this).serialize()
      }).then(({data:res}) => {
        if(res.code == 0) {
          $('tbody').html(' ')
          initialise();
          layer.closeAll();
          layer.msg(res.message)
        }else {
          layer.closeAll();
          layer.msg(res.message)
        }
      })
    })
  })

  // 点击修改按钮
  $('tbody').on('click','.btn-edit',function() {
    layer.open({
      title: '添加文章分类',
      type: 1,
      content: $('#template_xg').html(),
      area: ['400px', '230px']
    });

    var del_id = $(this).data('myid');
    axios({
      method: 'GET',
      url: '/my/cate/info',
      params: {
        id: del_id
      }
    }).then(({data:res}) => {
      if(res.code == 0) {
        layui.form.val('form-edit', res.data);
      }
    })

    // 修改表单监听
    $('#form-edit').submit(function(e) {
      // console.log($(this).serialize());
      e.preventDefault();
      axios({
        method: 'PUT',
        url: '/my/cate/info',
        data: $(this).serialize()
      }).then(({data:res}) => {
        if(res.code == 0) {
          $('tbody').html(' ')
          initialise();
          layer.closeAll();
          layer.msg(res.message)
        }else {
          layer.closeAll();
          layer.msg(res.message)
        }
      })
    })
  

  })

  // 点击删除按钮
  $('tbody').on('click','.btn-delete',function() {
    var del_id = $(this).data('myid');
    axios({
      method: 'DELETE',
      url: '/my/cate/del',
      params: {
        id: del_id
      }
    }).then(({data:res}) => {
      if(confirm('确定要删除么')) {
        if(res.code == 0) {
          $('tbody').html(' ')
          initialise();
          layer.msg(res.message);
        }else {
          layer.msg(res.message);
        }
      }
    })
  })
})