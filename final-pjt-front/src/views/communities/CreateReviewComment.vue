<template>


<div style="background-color: white;">
  <!-- <h1>comment tab it will be delete</h1> -->
  <!-- <h1>{{reviewId}}</h1> -->
  <b-container>
    <b-row style="background-color: white;">
      <b-col class="textbox" cols="9" style="background-color: white; margin: 0px 0px 0px 5%;">
        <input v-model="commentData.content" type="text" style="width:100%;">
      </b-col >
      <b-col style="background-color: white;">
        <button @click="createComment" class="btn btn-success"> 댓글달기</button>
      </b-col>
    </b-row>
  </b-container>
  <div style="background-color: white;">
    <button @click="seeComment" class="btn"><font-awesome-icon :icon="['far','comment']" size="lg" :style="{ color: 'green' }"/></button>
    <button @click="closeComment" class="btn"><font-awesome-icon :icon="['fas','comment-slash']" size="lg" :style="{ color: 'green' }"/></button>
  </div>
  <ul>
    <li v-for="comment in comments" :key="`${comment.id}`" style="background-color: white; list-style:none; padding:3px; margin:3px;">
      <b-row style="background-color: white; position:relative;">
        <b-col cols="2" style="background-color: white;">
          <b-avatar :src="gravatar(comment.email)" size="6rem"></b-avatar>
        </b-col>
        <b-col cols="8" style="background-color: white; text-align: left; padding:5px;">
          <p><span style="font-weight:bold; font-size: 1.1m;">{{comment.nickname}}</span> @{{comment.username}}</p>
          <!-- <p>comment: {{comment.id}}</p> -->
          <p style="font-size: 1em;">{{ comment.content }}</p>
          <p>createtime: {{ comment.created_at | moment("from", "now") }} updatetime: {{ comment.updated_at | moment("from", "now") }}</p>
        </b-col>
        <b-col cols="2" style="background-color: white; position:absolute; right:0px; bottom:0px">
          <button style="background-color: #EAEAEA; font-size: 0.8em;" class="btn" @click="deleteComment(comment)">DELETE</button>
        </b-col>
      </b-row>
      <hr>
    </li>
  </ul>
        

</div>
</template>

<script>
import md5 from "md5";
import axios from'axios'
import jwt_decode from "jwt-decode"
export default {
  name: "CreateReviewComment",
  data() {
    return {
      comments: null,
      commentData: {
        content: '',
      },
      profileData: {
        UserName: jwt_decode(localStorage.jwt).username,
      },
    }
  },
  props: {
    reviewId: {
      type: Number,
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
    getComments: function () { 
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/community/${this.reviewId}/comments/`,
        headers: this.setToken(),
      })
        .then((res) => {
          this.comments = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    seeComment() {
      this.getComments()
    },
    closeComment() {
      this.comments = null
    },
    gravatar(mail) {
      const hash = md5(mail);
      return `https://www.gravatar.com/avatar/${hash}`;
    },
    createComment() {
      const commentItem = {
        content: this.commentData.content,
        UserName: jwt_decode(localStorage.jwt).username,
      }
      if (commentItem) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/community/${this.reviewId}/comments/`,
          data: commentItem,
          headers: this.setToken()
          
        })
          .then((res) => {
            console.log(res)
            // this.$emit('complete', this.emitData)
            this.getComments()
            this.commentData.content = ''
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },
    deleteComment:function (comment) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${this.reviewId}/comments/${comment.id}/`,
        headers: this.setToken(),
        data: this.profileData
        
      })
        .then((res) => {
          console.log(res)
          if (res.data.message === "코멘트삭제실패"){
            alert('본인글만 삭제 가능합니다')
          }
          else{
            this.getComments()
          }
          
        })
        .catch((err) => {
          console.log(err)
        })
    },

  },
  
}

</script>

<style scoped>
html {
  background-color: #F3EFE4;
}
div {
  background-color: white;
}

.textbox { 
  position: relative; 
  width: 85%; 
  margin: auto;
  margin-left:auto; 
  margin-right:auto;
  }
.textbox input[type="text"] {
  width: 85%; 
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