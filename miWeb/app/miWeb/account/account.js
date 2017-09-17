/**
 * Created by 阮晓锋 on 2017/9/7.
 */
$(function () {
  var password=store.get('userPassword');
  console.log('vxcv',password);
/*  ====初始化modal====*/
  $('#xiugai').on('click',function () {
    $('#oldPassword').val('');
    $('#newPassword2').val('');
    $('#newPassword1').val('');
    $('#oldPassword').next().html('')
    $('#newPassword2').next().html('<span>密码长度8~16位，其中数字，字母和符号至少包含两种</span>')
  })

  $('#oldPassword').on('blur',function () {
    if($('#oldPassword').val()!==''){
      if($('#oldPassword').val()!==password){
        $('#oldPassword').next().html('<span style="color: red">密码错误</span>')
      }else{
        $('#oldPassword').next().html('')
      }
    }
  })
  $('#oldPassword').on('focus',function () {
    $('#newPassword2').next().html('<span >密码长度8~16位，其中数字，字母和符号至少包含两种</span>')
  });
  $('#newPassword2').on('focus',function () {
    $('#newPassword2').next().html('<span >密码长度8~16位，其中数字，字母和符号至少包含两种</span>')
  });
  $('#newPassword1').on('focus',function () {
    $('#newPassword2').next().html('<span>密码长度8~16位，其中数字，字母和符号至少包含两种</span>')
  });
  $('#newPassword1').on('blur',function () {
    if($('#newPassword2').val()!==''){
      if($('#newPassword2').val()!==$('#newPassword1').val()){
        $('#newPassword2').next().html('<span style="color: red">两次新密码输入不一致</span>')
        if(!$('#newPassword2').val().match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)){
          $('#newPassword2').next().html('格式错误')
        }
      }
      else{
        $('#newPassword2').next().html('<span>密码长度8~16位，其中数字，字母和符号至少包含两种</span>')
        if(!$('#newPassword2').val().match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)) {
          $('#newPassword2').next().html('<span style="color: red">格式错误</span>')
        }
      }
    }
  })
  $('#newPassword2').on('blur',function () {
    if($('#newPassword1').val()!==''){
      if($('#newPassword2').val()!==$('#newPassword1').val()){
        $('#newPassword2').next().html('<span style="color: red">两次新密码输入不一致</span>')

      }else{
        $('#newPassword2').next().html('<span>密码长度8~16位，其中数字，字母和符号至少包含两种</span>')
        if(!$('#newPassword2').val().match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)) {
          $('#newPassword2').next().html('<span style="color: red">格式错误</span>')
        }
      }
    }
  })
  $('#btnPasswordSure').on('click',function () {
    if($('#oldPassword').val()==''){
      $('#oldPassword').next().html('<span style="color: red">请输入密码</span>')
    }
    if($('#oldPassword').val()!==''&&!$('#newPassword1').val().match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)||
      !$('#newPassword1').val().match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)){
      $('#newPassword2').next().html('<span style="color: red">请输入新密码</span>')
    }
    if($('#oldPassword').val()==password&&$('#newPassword2').val().match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)
      &&$('#newPassword1').val().match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)
     ){
      store.add('userPassword',$('#newPassword1').val());
      $('#btnPasswordSure').attr('data-dismiss','modal');
    }
  })

/*  =========
              ======个人信息======
                                   ========  */
  var editName=$('#editName');
  var name=$('#name');
  var birthday=$('#birthday');
  var sex=$('#sex');
  $('#userName').html(store.get('userName'));
  name.html(store.get('userName'));
  $('#year').html(store.get('year'));
  $('#month').html(store.get('month'));
  $('#day').html(store.get('day'));

  sex.html(store.get('userSex'));
  $('#edit-btn').on('click',function () {
    $('#editName').attr('value',$('#name').text());
    $('#year-option').html($('#year').text());
    $('#month-option').html($('#month').text());
    $('#day-option').html($('#day').text());
    if(sex.text()=='男'){
      $('#men').attr('checked',true)
    }
    if(sex.text()=='女'){
      $('#women').attr('checked',true)
    }
    $('#name-hint').html('')
  })
  editName.on('focus',function () {
    $('#name-hint').html('<span style="color: #888888">请输入3~20个字符</span>')
  })
  editName.on('blur',function () {
    if(editName.val().length<3&&editName.val().length>0||editName.val().length>20){
      $('#name-hint').html('<span style="color:rgb(242,102,0)">名称不合法</span>')
    }else {
      $('#name-hint').html('')
    }
  });
/*  $('#sel1').on('blur',function () {
    if($('#sel1').val()!=='年'&&$('#sel2').val()!=='月'&&$('#sel3').val()!=='日'){
      $('#name-hint').html('')
    }
  })*/
  $('#editSure').on('click',function () {
    if(editName.val().length<3&&editName.val().length>0||editName.val().length>20){
      $('#name-hint').html('<span style="color:rgb(242,102,0)">名称不合法</span>')
    }
    if(editName.val()==''){
      $('#name-hint').html('<span style="color:rgb(242,102,0)">请输入名称</span>')
    }
/*    if($('#sel1').val()=='年'||$('#sel2').val()=='月'||$('#sel3').val()=='日'){
      $('#result').html('<span style="color:rgb(242,102,0)">请输入生日</span>')
    }else{
      $('#result').html('')
    }*/
     if(editName.val().length>=3&&editName.val().length<20){
       $('#userName').html(editName.val());
       name.html(editName.val());
       $('#year').html($('#sel1 option:selected').text());
       $('#month').html($('#sel2 option:selected').text());
       $('#day').html($('#sel3 option:selected').text());
/*
       birthday.html('<span id="year">'+$('#sel1 option:selected').text()+'</span>-<span id="month">'+$('#sel2 option:selected').text()+'</span>-<span id="day">'+$('#sel3 option:selected').text()+'</span>')
*/

       if($('#men').is(':checked')){
         sex.html('男')
       }else{
         sex.html('女')
       }
       store.updata('userName',editName.val());
       store.updata('year',$('#sel1 option:selected').text());
       store.updata('month',$('#sel2 option:selected').text());
       store.updata('day',$('#sel3 option:selected').text());
       store.updata('userSex',sex.html());
       $('#editSure').attr('data-dismiss','modal')
     }

  })
  $('#editSure').removeAttr('data-dismiss')
  $('#out').on('click',function () {
    store.remove('userStata');
    window.location.replace('../login/loginSimple.html');
  })



});
