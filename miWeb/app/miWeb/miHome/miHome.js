/**
 * Created by 阮晓锋 on 2017/8/28.
 */
$(function () {
  var userStata=store.get('userStata');
  var userPhone=store.get('userPhone');
  if (userStata==true){
    var carts=[];
    $.getJSON('cart.json',function (data) {
      carts=data;
      var cartHtml='';
      for(var i=0,len=carts.length;i<len;i++){
        cartHtml+='<tr><td><img src="'+carts[i].picture+'" alt=""></td>';
        cartHtml+='<td style="width: 100px">'+carts[i].name+carts[i].key+'</td>';
        cartHtml+='<td>'+carts[i].price+'元×'+carts[i].quantity+'</td></tr>';
      }
      $('table tr').html(cartHtml);
      var num='('+len+')';
      $('#num').html(num);
    });

    var userMenuHtml='';
    userMenuHtml='<a class="list-group-item" href="../personalCenter/personalCenter.html">个人中心</a>';
    userMenuHtml+='<a class="list-group-item" href="#">评价晒单</a>';
    userMenuHtml+='<a class="list-group-item" href="#">我的喜欢</a>';
    userMenuHtml+='<a class="list-group-item" href="../account/account.html">小米账户</a>';
    userMenuHtml+='<a id="logout" class="list-group-item" href="#">退出登录</a>';
    $('#userMenu').html(userMenuHtml);
    $('#userName').html('<span>'+userPhone+'<span class="glyphicon glyphicon-menu-down"></span></span>');
    $('#userName').removeAttr('href');
    $('#message').html('<a href="#">消息通知</a>');
    $('#orders').html('<a href="#">我的订单</a>');
  }
  $('[data-toggle=hover]').parent().hover(function () {
    $(this).addClass('open');
  },function () {
    $(this).removeClass('open');
  });

  $('#logout').on('click',function () {
    // store.add('userStata',false);
      store.remove('userStata');
      console.log('sadasdsadsa');
      $('#userName-parent').html(' <a  href="../login/login.html">登陆</a>');
      $('#message').html('<a href="#">注册</a>');
      $('#orders').html('<a href="#">消息通知</a>');
      $('table tr').html('<td><p style="padding: 27px">购物车中还没有商品，赶紧选购吧！</p></td>');
      $('#num').html('(0)');
      console.log( userStata);
  });

  if(userStata==false||userStata==null){
    $('#userName-parent').html(' <a  href="../login/login.html">登陆</a>')
    $('#message').html('<a href="#">注册</a>');
    $('#orders').html('<a href="#">消息通知</a>');
    $('table tr').html('<td><p style="padding: 27px">购物车中还没有商品，赶紧选购吧！</p></td>');
    $('#num').html('(0)');
  }


  $('#miPhone').parent().mouseover(function () {
    $('#miPhoneText').addClass('in');
  })
  $('#miPhone').parent().mouseout(function () {
      $('#miPhoneText').removeClass('in');
    })
  $('#hongMi').parent().mouseover(function () {
    $('#hongMi').click();
  })
  $('#hongMi').parent().mouseout(function () {
    $('#hongMi').click();
  })
  
    $('#phoneCard').popover({html:true,content:'<div class="container-fluid" style="padding: 0"><div class="row popover-row-con"> '
  +'<div class="col-lg-4"><ul class="list-group">'
  +'<li class="list-group-item"><img style="width: 60px" src="img/imPhone/5s-12!160x110.jpg" alt=""><span>小米Note3</span><button>选购</button></li>' +
  '</ul> </div> '
  +'<div class="col-lg-4"><ul class="list-group">'
  +'<li class="list-group-item"><img style="width: 60px" src="img/imPhone/5s-12!160x110.jpg" alt=""><span>小米Note3</span><button>选购</button></li>' +
  '</ul> </div> '
  +'<div class="col-lg-4"><ul class="list-group">'
  +'<li class="list-group-item"><img style="width: 60px" src="img/imPhone/5s-12!160x110.jpg" alt=""><span>小米Note3</span><button>选购</button></li>' +
  '</ul> </div> '
  +'</div> </div>'})
    $('#computer').popover({html:true,content:'<div class="container-fluid" style="padding: 0"><div class="row popover-row-con"> '
    +'<div class="col-lg-4"><ul class="list-group">'
    +'<li class="list-group-item"><img style="width: 60px" src="img/imPhone/5s-12!160x110.jpg" alt=""><span>小米Note3</span></li>' +
    '</ul> </div> '
    +'<div class="col-lg-4"><ul class="list-group">'
    +'<li class="list-group-item"><img style="width: 60px" src="img/imPhone/5s-12!160x110.jpg" alt=""><span>小米Note3</span></li>' +
    '</ul> </div> '
    +'<div class="col-lg-4"><ul class="list-group">'
    +'<li class="list-group-item"><img style="width: 60px" src="img/imPhone/5s-12!160x110.jpg" alt=""><span>小米Note3</span></li>' +
    '<li class="list-group-item"><img style="width: 60px" src="img/imPhone/5s-12!160x110.jpg" alt=""><span>小米Note3</span></li>' +
    '</ul> </div> '

    +'</div> </div>'})


});
