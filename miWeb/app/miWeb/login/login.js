/**
 * Created by 阮晓锋 on 2017/9/6.
 */

$(function () {
  var user=$('#user');
  var password=$('#password');
  $('article').hide();
  $('#zhanhao ').on('click','a',function () {
    $('article').hide();
    $('#saoma a').css('color','#555555');
    $(this).css('color','rgb(245,102,0)');
    $('form').show();

  })
  $('#saoma a').on('click',function () {
    $('#saoma a').css('color','rgb(245,102,0)');
    $('#zhanhao a').css('color','#555555');
    $('form').hide();
    $('article').show();
  })
/*=======
       ====登陆验证=====
                            ========*/


  var getpassword=store.get('userPassword');
  var getusername=store.get('userPhone');
  $('#login').on('click',function () {

    if($('#user').val()==getusername&&$('#password').val()==getpassword){
      store.add('userStata',true);
      window.location.replace('../miHome/miHome.html');
      console.log(getpassword);
      console.log( getusername);
      console.log( store.get('userStata'));
    }
    if(!$('#user').val().match(/^(((1[3-8][0-9]{1})|159|153)+\d{8})$/)) {
      $('#hint').html('<span style="color: red">帐号输入错误</span>')
    }
    if($('#user').val()==getusername&&$('#user').val().match(/^(((1[3-8][0-9]{1})|159|153)+\d{8})$/)
      &&$('#password').val()!==getpassword){
      $('#hint').html('<span style="color: red">密码输入错误</span>')
    }
  })
  $('#user').on('blur',function () {
    if($('#user').val().match(/^(((1[3-8][0-9]{1})|159|153)+\d{8})$/)){
      $('#hint').html('')
    }
  })

});

