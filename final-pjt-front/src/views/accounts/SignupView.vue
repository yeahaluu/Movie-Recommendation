<template>
  <div style="background-color: #F3EFE4">
    <h1>Signup</h1>
    <p style="font-size: 1.3em; color: gray">필수입력사항입니다</p>
    <div class="textbox">
      <label for="username">사용자 이름</label>
      <input type="text" id="username" v-model="credentials.username">
    </div>
    <div class="textbox">
      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="credentials.password">
    </div>
    <div class="textbox">
      <label for="passwordConfirmation">비밀번호 확인</label>
      <input type="password" id="passwordConfirmation" v-model="credentials.passwordConfirmation">
    </div>
    <div class="textbox">
      <label for="email">e-mail</label>
      <input v-model="credentials.email" type="text">
    </div>
    
    <hr>
    <!-- <h1>profile</h1> -->
    <p style="font-size: 1.3em; color: gray">선택사항입니다</p>
    <div class="textbox">
      <label for="nickname">닉네임</label>
      <input v-model="credentials.nickname" type="text">
    </div>
    <div class="textbox">
      <label for="introduce">자기소개</label>
      <input v-model="credentials.introduce" type="text">
    </div>
    

    <button @click="signup(credentials)" class="btn btn-success">회원가입</button>

    
  </div>
  
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
// const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirmation: null,
        nickname: null,
        profileImage: null,
        introduce: null,
        email: null,
      }
    }
  },
  methods: {
    signup: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: this.credentials,
      })
        .then(res => {
          console.log(res)
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
$(document).ready(function() { 
  var placeholderTarget = $('.textbox input[type="text"], .textbox input[type="password"]'
  ); 
  //포커스시 
  placeholderTarget.on('focus', function(){ 
    $(this).siblings('label').fadeOut('fast'); 
  }); 
  
  //포커스아웃시 
  placeholderTarget.on('focusout', 
  function(){ 
    if($(this).val() == ''){ 
  $(this).siblings('label').fadeIn('fast'); 
  } 
  }); 
});
</script>

<style>
html {
  background-color: #F3EFE4;
}
.textbox { 
  position: relative; 
  width: 30%; 
  margin: 15px;
  margin-left:auto; 
  margin-right:auto;
  }
.textbox label {
  position: absolute;
  top: 1px; 
  left: 1px; 
  padding: .8em .5em; 
  color: #999;
  cursor: text;
}

.textbox input[type="text"],
.textbox input[type="password"] {
  width: 100%; 
  height: auto; 
  line-height : normal; 
  padding: .8em .5em; 
  border: 1px solid #999;
  border-radius: 0;  
  outline-style: none;  
  -webkit-appearance: none;  
  -moz-appearance: none;
  appearance: none;
}
</style>