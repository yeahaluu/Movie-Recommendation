<template>
  <div style="background-color: #F3EFE4;">
    <h1 style="font:bold;">Login</h1>
      <div class="textbox">
        <label for="username">사용자 이름</label>
        <input type="text" id="username" v-model="credentials.username">
      </div>
      <div class="textbox">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="credentials.password">
      </div>
      <button @click="login" class="btn btn-success">로그인</button>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
// const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      }
    }
  },
  methods: {
    login: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
        .then(res => {
          console.log(res)
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$router.push({ name: 'Maindoor' })
        })
        .catch(err => {
          console.log(err)
        })
    },
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

<style scoped>
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
  outline-style: none; 
  -webkit-appearance: none; 
  -moz-appearance: none;
  appearance: none;
}
</style>