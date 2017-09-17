/**
 * Created by 阮晓锋 on 2017/8/28.
 */
$(function () {
  var carts=[];

    $.getJSON('cart.json',function (data) {
      carts=data;
      var html='';
      for(var i=0,len=carts.length;i<len;i++){
        html+='<tr><td><img src="'+carts[i].picture+'" alt=""></td>';
        html+='<td style="width: 100px">'+carts[i].name+carts[i].key+'</td>';
        html+='<td>'+carts[i].price+'元×'+carts[i].quantity+'</td></tr>';
      }
      $('table tr').html(html);
      var num='('+len+')';
      $('#num').html(num);
    });
    $('#btn-cart').parent().on('mouseover mouseout',function () {
      $('#btn-cart').toggleClass('open ')
    });
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
    window.location.replace('../miHome/miHome.html');
  });

  if(userStata==false&&userStata==null){
    $('#userName-parent').html(' <a  href="../login/login.html">登陆</a>')
    $('#message').html('<a href="#">注册</a>');
    $('#orders').html('<a href="#">消息通知</a>');
    $('table tr').html('<td><p style="padding: 27px">购物车中还没有商品，赶紧选购吧！</p></td>');
    $('#num').html('(0)');
  }

  var phoneNumber=store.get('userPhone');
  $("#userID").html(phoneNumber.substring(0, 3) + "****" + phoneNumber.substring(9, 11));

})
