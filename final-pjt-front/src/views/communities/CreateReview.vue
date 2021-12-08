<template>
  <div>
    <div class="card" style="background-color: #F3EFE4; padding:10px;">
      <p style="text-align: left; padding: 0px 0px 0px 8%; font-size: 1.1em; color: gray;">오늘 본 영화는 어땠나요?</p>

      <div class="textbox">
        <label for="title">제목</label>
        <input v-model="reviewData.title" id="title" type="text" />
      </div>
      
      <div class="textbox">
        
        <label for="content">새로운 글을 써보세요</label>
        <textarea v-model="reviewData.content" id="content" cols="30" rows="10">Tell me about the movie you watched</textarea>
      </div>
      <div object align="right" style="padding: 0px 8% 0px 0px;" >
        <button @click="createReview(reviewData)" class="btn btn-success" >Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from'axios'
import $ from 'jquery'
import jwt_decode from "jwt-decode"

export default {
  name: 'CreateReview',
  data: function () {
    return {
      reviewData: { title: '', content: '', UserName: '' },
      emitData: {id: '', title: '', content: '', NickName: '', UserName: ''}
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    createReview: function () {
      const reviewItem = {
        title: this.reviewData.title,
        content: this.reviewData.content,
        UserName: jwt_decode(localStorage.jwt).username,
      }
      console.log(reviewItem)
      if (reviewItem) {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/community/',
          data: reviewItem,
          headers: this.setToken()
        })
          .then((res) => {
            console.log(3)
            console.log(res)
            this.emitData = res.data
            console.log(2)
            console.log(this.emitData)
            this.$emit('complete', this.emitData)
            // this,reviewData.NickName = 
            this.reviewData.title = ''
            this.reviewData.content = ''
            this.reviewData.UserName =  ''
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },
  }
}
$(document).ready(function() { 
  var placeholderTarget = $('.textbox input[type="text"], .textbox textarea'
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
.textbox { 
  position: relative; 
  width: 85%; 
  margin: auto;
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

.textbox input[type="text"] {
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
.textbox textarea {
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
html {
  background-color: #F3EFE4;
}
</style>