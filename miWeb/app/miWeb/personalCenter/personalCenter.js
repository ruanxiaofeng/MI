/**
 * Created by 阮晓锋 on 2017/9/8.
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
  /*  ========
             =====时间问好=====
                             ====== */
  var  myDate=new Date()
  var hours=myDate.getHours();
  if(hours<12){
    $('#timeShow').html('早上好~')
  }
  if(hours<14&&hours>=12){
    $('#timeShow').html('中午好~')
  }
  if(hours<18&&hours>=14){
    $('#timeShow').html('下午好~')
  }
  if(hours<=24&&hours>=18){
    $('#timeShow').html('晚上好~')
  }

/*======页面转换========*/

  $('.main-myAddress').hide();
  $('#myCentre').on('click',function () {
    $('.main-myAddress').hide();
    $('.main').show();
    $(this).css('color','rgb(242,102,0)');
    $('#myAddress').css('color','#888888')
  });
  $('#myAddress').on('click',function () {
    $('.main').hide();
    $('.main-myAddress').show();
    $(this).css('color','rgb(242,102,0)');
    $('#myCentre').css('color','#888888');
  })

/*======
          ====判断验证=====
                              ====*/
  $('#modal-postcode').on('blur',function () {
    if ($('#modal-postcode').val()!=='') {
      var reg=/^[1-9][0-9]{5}$/;
      if (!reg.test($('#modal-postcode').val())) {
        $(".modal-postcode-hint").html("<p style='color:red;'>邮编格式错误！</p>");
        return false;
      }
      else {
        $(".modal-postcode-hint").empty();
      }
    }
  })
  $('#modal-number').on('blur',function () {
    if ($('#modal-number').val()!=='') {
      if (!$('#modal-number').val().match(/^(((1[3-8][0-9]{1})|159|153)+\d{8})$/)) {
        $(".modal-number-hint").html("<p style='color:red;'>手机号码格式错误！</p>");
        return false;
      }
      else {
        $(".modal-number-hint").html("");
        return true;
      }
    }
  });
  $('#modal-name').on('blur',function () {
    if ($('#modal-name').val()!=='') {
        $(".modal-name-hint").html("");
    }
  });
  $('#modal-address1').on('blur',function () {
    if ($('#modal-address1').val()!=='') {
      $(".modal-address1-hint").html("");
    }
  });
  $('#modal-address2').on('blur',function () {
    if ($('#modal-address2').val()!=='') {
      $(".modal-address2-hint").html("");
    }
  });
  $('#modal-tag').on('focus',function () {
    $(".modal-tag-hint").html("");
      $(".modal-tag-hint").html("<p >地址标签1~5个字符</p>");
  });
  $('#modal-tag').on('blur',function () {
    if($('#modal-tag').val()!==''){
      if($('#modal-tag').val().length>5){
        $(".modal-tag-hint").html("<p style='color:red;'>格式错误！</p>");
      }
      else {
        $(".modal-tag-hint").html("");
      }
    }

  });
  var append='';
/*
  $('#modal-sure').on('click',function () {
    if($('#modal-number').val()==''){
      $('.modal-number-hint').html('<p style="color: red">请输入收货人电话</p>');
      $('#modal-sure').removeAttr('data-dismiss')
    }
    if($('#modal-name').val()==''){
      $('.modal-name-hint').html('<p style="color: red">请输入收货人手机号码</p>');
    }
    if($('#modal-address2').val()==''){
      $('.modal-address2-hint').html('<p style="color: red">请输入省市区</p>');
    }
    if($('#modal-address1').val()==''){
      $('.modal-address1-hint').html('<p style="color: red">请输入详细地址</p>');
    }
    if($('#modal-postcode').val()==''){
      $('.modal-postcode-hint').html('<p style="color: red">请输入邮编</p>');
    }
    if($('#modal-tag').val()==''){
      $('.modal-tag-hint').html('<p style="color: red">请输入地址标签1~5个字符</p>')
    }

    if($('#modal-number').val()!==""&&$('#modal-number').val()!==""
      &&$('#modal-address2').val()!==""&&$('#modal-address1').val()!==""&& $('#modal-postcode').val()!==""&&$('#modal-tag').val()!==""){
      $('#modal-sure').attr('data-dismiss','modal');
      append='<div class="address-con "><ul>';
      append+='<li ><span class="name">'+$('#modal-name').val()+'</span><span class="tag">'+ $('#modal-tag').val()+'</span></li>';
      append+='<li class="phoneNumber">'+ $('#modal-number').val()+'</li>';
      append+=' <li class="address1">'+ $('#modal-address1').val()+'</li>';
      append+=' <li class="address2">'+ $('#modal-address2').val()+'</li>';
      append+='<li class="postcode">'+ $('#modal-postcode').val()+'</li>';
      append+=' <li class="delet"><a class="change" href="#" data-toggle="modal" data-target="#modal-change">修改</a><a href="#">删除</a></li>';
      append+=' </ul> </div>';
      $('.main-myAddress').append(append);
    }
  })
*/
/*  var ADDRESS_KEY = 'Address';
  var addresses = store.get(ADDRESS_KEY,[]);
  function renderAddressList(addresses){
    var htmls = '';
    for(var i = 0, len = addresses.length; i < len; i++){
      htmls += renderAddressItem(addresses[i]);
    }
    $('#addressList').append(htmls);
  }
//生成地址详情
  function  renderAddressItem(address){
    var htmls = '';
/!*    显示收货地址时需要把收货地址相关属性的值拼接在一起。
    ......代码省略*!/
    htmls='<div  class="address-con "  data-id="'+address.id+'"><ul>';
    htmls+='<li ><span class="name">'+address.name+'</span><span class="tag">'+ address.label+'</span></li>';
    htmls+='<li class="phoneNumber">'+ address.phone+'</li>';
    htmls+=' <li class="address1">'+ address.province+address.city+'</li>';
    htmls+=' <li class="address2">'+ address.detailAddress+'</li>';
    htmls+='<li class="postcode">'+ address.postcode+'</li>';
    htmls+=' <li class="delet"><a class="update"  href="#" data-toggle="modal" data-target="#modal-change">修改</a><a class="delete" href="#">删除</a></li>';
    htmls+=' </ul> </div>';

    return htmls;
  }
  renderAddressList(addresses);

  $('#saveForAdd').on('click', function(){
    var id = 1;//数组中没有地址数据时，添加的地址数据id的值为1
    if(addresses.length > 0){
      id = addresses[addresses.length - 1].id + 1;
    }
    var address = {
      id:id,
      name:$('#modal-name').val(),
      phone:$('#modal-number').val(),
      province:1,
      city:2,
      districtOrCounty:3,
      detailAddress:$('#modal-address2').val(),
      postcode:$('#modal-postcode').val(),
      label:$('#modal-tag').val()
    };
    //实现参考 “实现添加地址功能”
    addresses.push(address);
    store.updata(ADDRESS_KEY, addresses);
    // localStorage.setItem('ADDRESS_KEY',JSON.stringify(addresses));
    renderAddressItem(address);
  });
/!*  $('#addressList').on('click','.delete',function(){
    //实现参考 “实现删除地址功能”
    var $a=$(this);
    var id=$a.parent().parent().parent().data('id');
    for(var i = 0, len = addresses.length; i < len; i++){
     if(addresses[i].id=== id){
     //需要给用户提示，确认要删除吗？
     addresses.splice(i,1);
       store.update(ACCOUNT_KEY, addresses);
       $a.parent().parent().parent().remove();//元素的遍历根据实际情况调整
     break;
     }
     }
    var index = addresses.findIndex(function(item){
      return item.id === id;
    });//无符合条件返回-1
    if(index != -1){
      //需要给用户提示，确认要删除吗？
      addresses.splice(index,1);
      store.update(ACCOUNT_KEY, addresses);
      $a.parent().parent().parent().remove();//元素的遍历根据实际情况调整
    }
  });*!/
  $('#addressList').on('click','.delete',function () {
    var $a=$(this);
    var id=$a.parent().parent().parent().data('id');
    for(var i=0,len = addresses.length;i<len;i++) {
      if (addresses[i].id == id) {
        addresses.splice(i,1);
        store.update(ACCOUNT_KEY, addresses);
        // localStorage.setItem('ADDRESS_KEY',JSON.stringify(addresses));
        $a.parent().parent().parent().remove();
        break;
      }
    }

  })*/


});
