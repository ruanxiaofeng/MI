/**
 * Created by 阮晓锋 on 2017/8/28.
 */
$(function () {
  $('#register-box').hide();
  $('.shadow').hide();
  var countrise = [];
  var $phonerNumber = $('#phoneNumber-input');
  $.getJSON('country.json', function (data) {
    countrise = data;
    var html = '<li><input id="country-input" type="text" class="form-control"  ></li>';
    var number = '<li><input id="phonenumber-input" type="text" class="form-control" ></li>';
    html+='<li style="background-color: #ebcccc;  padding: 7px 20px ;">常用</li>';
    for (var i = 0, len = countrise.常用.length; i < len; i++) {
      html += '<li><a href="#">' + countrise.常用[i].C+ '</a></li>';
    }
    html+='<li style="background-color: #ebcccc;  padding: 7px 20px ;">A</li>';
    for ( i = 0, len = countrise.A.length; i < len; i++) {
      html += '<li><a href="#">' + countrise.A[i].C+ '</a></li>';
    }
    html+='<li style="background-color: #ebcccc;  padding: 7px 20px ;">B</li>';
    for ( i = 0, len = countrise.B.length; i < len; i++) {
      html += '<li><a href="#">' + countrise.B[i].C+ '</a></li>';
    }

/*    ------------号码===========*/
    number+='<li style="background-color: #ebcccc;  padding: 7px 20px ;">常用</li>';
    for (  i = 0, len = countrise.常用.length; i < len; i++) {
      number+= '<li><a href="#">' + countrise.常用[i].C+ '<span class="pull-right">' + countrise.常用[i].N + '</span></a></li>'
    }
    number+='<li style="background-color: #ebcccc;  padding: 7px 20px ;">A</li>';
    for ( i = 0, len = countrise.A.length; i < len; i++) {
      number+= '<li><a href="#">' + countrise.A[i].C+ '<span class="pull-right numbers">' + countrise.A[i].N + '</span></a></li>'
    }
    number+='<li style="background-color: #ebcccc;  padding: 7px 20px ;">B</li>';
    for ( i = 0, len = countrise.B.length; i < len; i++) {
      number+= '<li><a href="#">' + countrise.B[i].C+ '<span class="pull-right numbers">' + countrise.B[i].N + '</span></a></li>'
    }
    $('#country').html(html);
    $('#phonenumber').html(number)
  });
/*  =====
          ====点击====
                        =====*/
  $('#country ').on('click', 'li a', function () {
    var countryName = $(this).text();
    $('#country-show').attr('value', countryName);
  });
  $('#phonenumber').on('click', 'li a', function () {
    var phonenumber = $(this).children('span').html();
    $('#numbers').html( phonenumber);
    console.log(phonenumber)
  });
/*  ======
          ========搜索========
                               ======*/
  $('#country-show').change(function () {
    console.log('sadasdasdasdasdasd11')
  })
   $('#country-input').on('keyup',function () {
     var selector = '';
     selector = ':contains('+ $(this).val() +')';
     $('#country ').children().hide();
     $('#country ').filter(selector).show();
   })

  /*==========
   ======== 手机验证========
   ===========*/
  $('#getCode').on('click', function () {
    if ($phonerNumber.val() == "") {
      $(".hint").html("<p style='color: rgb(242,140,0)'><span class='glyphicon glyphicon-exclamation-sign'></span>请输入手机号码</p>");
      $phonerNumber.focus();
      return false;
    }
    else {
      settime(this)
    }

  });
  var countdown = 60;

  function settime(obj) {
    if (countdown == 0) {
      obj.removeAttribute("disabled");
      obj.value = "免费获取验证码";
      countdown = 60;
      return;
    } else {
      obj.setAttribute("disabled", true);
      obj.value = "重新发送(" + countdown + ")";
      countdown--;
    }
    setTimeout(function () {
        settime(obj)
      }
      , 1000)
  }

  $phonerNumber.on('blur', function () {
    if ($phonerNumber.val() == "") {
      $(".hint").html("<p style='color: rgb(242,140,0)'><span class='glyphicon glyphicon-exclamation-sign'></span>请输入手机号码</p>");
      $phonerNumber.focus();
      return false;
    }
    if (!$phonerNumber.val().match(/^(((1[3-8][0-9]{1})|159|153)+\d{8})$/)) {
      $(".hint").html("<p style='color:red;'>手机号码格式错误！</p>");
      $phonerNumber.focus();
      return false;
    }
    else {
      $(".hint").html("<p style='color: green;'>手机号码正确！</p>");
      return true;
    }
  })
  /*  /============获取验证码==============*!/*/

  function four(num) {
    var str = num.toString();
    var len = str.length;
    if (len < 4) {
      for (var i = 0; i < 4 - len; i++) {
        str = '0' + str;
      }
    }
    return str;
  }

  $('#getCode').on('click', function () {
    var tel = $phonerNumber.val();
    random = four(Math.round(Math.random() * 9999));
    console.log("123123");
    $.ajax({
      url: 'http://smsapi.api51.cn/code/',
      type: 'GET',
      dataType: 'json',
      data: {
        code: random,
        mobile: tel
      },
            headers:{
       Authorization:'APPCODE 2a082ede239b4fe183f4794266eb1d6b'
       }
    }).done(function (data) {
      console.log(data)
    });
    console.log(random);
  });

  /*  ======  ==立即注册==  ==*/
  var random = 0;
  $('#register').click(function () {
    if (random == $('#outCode').val() && $phonerNumber.val() !== "") {
      // window.location.replace('register-setPassword.html');
      $('#register-box').show();
      $('.shadow').show();
    } else {
      alert('注册失败');
      return false;
    }
  });

  /*=========密码验证========*/

  var password1 = $('#password1');
  var password2 = $('#password2');
  password1.on('focus', function () {
    $('#hint-password1').html('密码长度8~16位的数字与字母')
  })
  password1.on('blur', function () {
    if (password1.val() == "") {
      $('#hint-password1').html('<p style="color: red">请输入密码</p>');
      return false;
    }
    if (!password1.val().match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)) {
      $('#hint-password1').html('<p style="color: red">密码格式错误</p>');
      return false;
    }
    else {
      $('#hint-password1').html('<p style="color: green">密码可用</p>');
      return true;
    }
  });
  password2.on('focus',function () {
    if(password1.val()==""){
      $('#hint-password1').html('<p style="color: red">请输入密码</p>');
      return false;
    }
  });
  password2.on('blur', function () {
/*    if (password2.val() == "") {
      $('#hint-password2').html('<p style="color: red">请输入密码</p>');
      return false;
    }*/
    if (password1.val() == password2.val()&&password2.val()!=="") {
      $('#hint-password2').html('<p style="color: green">密码相同</p>');

      return true;
    }
    if (password1.val()!== password2.val()){
      $('#hint-password2').html('<p style="color: red">密码不同</p>');
      return false;
    }
  });
  $('#passwordSure').on('click',function () {
    if( password2.val()== password1.val()&&password1.val()!==''){
/*      var account = {
        'phoneNumber':$phonerNumber.val(),
        'password':password2.val(),
        'userState':'false'
      };
      var ACCOUNT_KEY = 'account';
      store.add(ACCOUNT_KEY, account)*/
      store.updata('userPhone',$phonerNumber.val());
      store.updata('userPassword',password2.val());
      store.updata('userStata',true);
      window.location.replace('../miHome/miHome.html');
    }else{
      alert('请输入密码')
    }
  });

  $('#passwordCancel').on('click', function () {
    $('#register-box').hide();
    $('.shadow').hide();
  });



/*======= ======*/



});
