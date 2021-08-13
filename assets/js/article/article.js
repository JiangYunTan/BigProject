$(function () {
  
  // 获取文章列表分类
  function initialCanvasData() {
    axios({
      method: 'GET',
      url: '/my/cate/list'
    }).then(({data:res}) => {
      // console.log(res.data);
      if(res.code == 0) {
        res.data.forEach(function (item) {
          // console.log(item.cate_name);
          $('[name="cate_id"]').append(`
            <option value="${item.id}">${item.cate_name}</option>
          `)
        })
        layui.form.render('select')
      }
    })
  }
  initialCanvasData()

  // 获取文章列表数据
  var p = {
    pagenum:1,
    pagesize: 3,
    cate_id:$('[name="cate_id"]').val(),
    state:$('[name="state"]').val()
  }
  function gain() {
    axios({
      method:'GET',
      url: '/my/article/list',
      params : p
    }).then(({data:res}) => {
      // console.log(res);
      res.data.forEach(function(item , index) {
        var day = dayjs(item.pub_date).format('YYYY-MM-DD  HH:mm:ss') 
        // console.log(day);
        $('tbody').append(`
          <tr>
            <td><a href="javascript:;" style="color:red" class='Jaa' data-myid='${item.id}'>${item.title}</a></td>
            <td>${item.cate_name}</td>
            <td>${day}</td>
            <td>${item.state}</td>
            <td>
              <button type="button" class="layui-btn layui-btn-danger layui-btn-xs btn-delete" data-myid='${item.id}'>删除</button>
            </td>
          </tr>
        `)
        lay(res.total)
      })
      
    })
  }
  gain()
  
  // 筛选监听事件
  $('.layui-form-pane').submit(function (e) {
    e.preventDefault()
    $('tbody').html(' ')
    gain()

  })

  // 重置请求
  $('[type="reset"]').click(function (e) {
    $('[name="cate_id"]').val(' ')
    $('[name="state"]').val(' ')
    $('.layui-form-pane').submit()
  })

  // 渲染 分页效果
  function lay(total) {
    layui.laypage.render({
      elem: 'page-box', //注意，这里的 test1 是 ID，不用加 # 号
      count: total ,//数据总数，从服务端得到
      limit: p.pagesize,
      curr: p.pagenum,
      layout:['count','limit','prev','page','next','skip'],
      limits:[1,2,3,4,5],
      jump:function(obj,first) {
        p.pagenum = obj.curr
        p.pagesize = obj.limit
        // console.log(obj.curr);
        // console.log(obj.limit);
        // 首次不执行
        if(!first) {
          $('tbody').html(' ')
          gain();
        }
      }
    })
  }

  // 删除功能
  $('tbody').on('click','.btn-delete',function() {
    var del_id = $(this).data('myid');
    axios({
      method: 'DELETE',
      url: '/my/article/info',
      params: {
        id: del_id
      }
    }).then(({data:res}) => {
      if(confirm('确定要删除么')) {
        if(res.code == 0) {
          if(p.pagenum > 1&& $('tbody tr').length == 1) {
            p.pagenum--
          }
          $('tbody').html(' ')
          gain();
          layer.msg(res.message);
        }else {
          layer.msg(res.message);
        }
      }
    })
  })

  // 点击标题的a链接绑定点击事件实现效果
  $('tbody').on('click', '.Jaa' ,function() {
    var Jid = $(this).attr('data-myid')
    // console.log(Jid);
    axios({
      method: 'GET',
      url: '/my/article/info',
      params: {id:Jid}
    }).then(({data:res}) => {
      console.log(res);
      layer.open({
        title: '文章详情',
        type: 1,
        area:['85%','85%'],
        content: `
          <div class="artinfo-box">
          <h1 class="artinfo-title">${res.data.content}</h1>
          <div class="artinfo-bar">
            <span>作者：${res.data.nickname}</span>
            <span>发布时间：${dayjs(res.data.pub_date).format('YYYY-MM-DD  HH:mm:ss')}</span>
            <span>所属分类：${res.data.cate_name}</span>
            <span>状态：${res.data.state}</span>
          </div>
          <hr>
          <img src="http://www.liulongbin.top:3008${res.data.cover_img}" alt="" class="artinfo-cover">
          <div>文章的内容</div>
          </div>
        `
      });  
    })

  })

})