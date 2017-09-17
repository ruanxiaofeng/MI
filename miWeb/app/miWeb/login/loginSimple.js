/**
 * Created by 阮晓锋 on 2017/9/14.
 */
$(function () {
  $('#erweima').hide();
  $('#open-er').on('click',function () {
    $('#accountLogin').hide()
    $('#erweima').show()
  })
  $('#close-er').on('click',function () {
    $('#accountLogin').show()
    $('#erweima').hide();
  })
  $('#register').on('click',function () {
    if(!$('#userNameInput').val().match(/^(((1[3-8][0-9]{1})|159|153)+\d{8})$/)) {
      $('#hint').html('<span style="color: red">帐号输入错误</span>')
    }
    if($('#userNameInput').val()==store.get('userPhone')&&$('#userNameInput').val().match(/^(((1[3-8][0-9]{1})|159|153)+\d{8})$/)
      &&$('#passwordInput').val()!==store.get('userPassword')){
      $('#hint').html('<span style="color: red">密码输入错误</span>')
    }
    if($('#userNameInput').val()==store.get('userPhone') &&$('#passwordInput').val()==store.get('userPassword')){
      window.location.replace('../miHome/miHome.html');
      store.updata('userStata',true)
    }
  })
  $('#userNameInput').on('blur',function () {
    if($('#userNameInput').val().match(/^(((1[3-8][0-9]{1})|159|153)+\d{8})$/)){
      $('#hint').html('')
    }
  })

})
