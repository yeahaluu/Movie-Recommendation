<template>
  <div style="background-color: #F3EFE4;">
    <!-- <h1>REVIEW</h1> -->
    <CreateReview @complete="getReviews"/>
    <ul>
      <li v-for="review in reviews" :key="`review_${review.id}`" style="background-color: #F3EFE4; list-style:none; padding:10px;">
        <div class="card" style="margin: auto; width: 90%; padding: 20px;background-color: white;">
          <b-row style="background-color: white; position:relative;">
            <b-col cols="2" style="background-color: white;">
              <b-avatar :src="gravatar(review.email)" size="6rem"></b-avatar>
            </b-col >
            <b-col cols="8" style="text-align: left; padding:5px; background-color: white;">
              <!-- <a href="">{{review.nickname}} @{{review.username}}</a> -->
              <p><span  @click="moveToProfile(review.username)" style="font-weight:bold; cursor: pointer; font-size: 1.1m;">{{review.nickname}}</span> @{{review.username}} ㆍ<span style="font-weight:bold; font-size: 0.9m;">{{ review.created_at | moment("from", "now") }}</span>ㆍ수정: <span>{{ review.updated_at | moment("from", "now") }}</span> </p>
              <p style="font-weight:bold; font-size: 1.2em;">{{ review.title }}</p>
              <p style="font-size: 1em;">{{ review.content }}</p>              
            </b-col>
            <b-col cols="2" style="background-color: white; position:absolute; right:0px; bottom:0px">
              <div>
                <button @click="PutReviews(review)" style="background-color: #EAEAEA; font-size: 0.9em; width:50%" class="btn">EDIT</button>
              </div>
              <div>
                <button @click="deleteReviews(review)" style="background-color: #EAEAEA; font-size: 0.9em; width:50%" class="btn">DELETE</button>
              </div>
 
            </b-col>
          </b-row>
          
          <hr>
            <CreateReviewComment :reviewId= review.id style="background-color: white;"/>
          
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import md5 from "md5";
import axios from'axios'
import jwt_decode from "jwt-decode"
import CreateReview from './CreateReview.vue'
import CreateReviewComment from './CreateReviewComment.vue'


export default {
  name: 'Review',
  components : {
    CreateReview,
    CreateReviewComment
  },

data: function () {
    return {
      profileData: {
        UserName: '',
      },
      color_black: false,
      reviews: null,
      UserName: null,
      nickname: null,
      emitData: null,
      email: '',
    
    }
  },

  methods: {
    moveToProfile: function(selectusername){
      console.log(selectusername)
      sessionStorage.setItem('profilename', selectusername)
      this.$router.push({ name: 'anotherProfile' })
    },
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    // 갱신하는 함수인데 
    getReviews: function (emitData) { 
      console.log(1)
      console.log(emitData)

      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/community/',
        headers: this.setToken(),
        
      })
        .then((res) => {
          console.log(res.data)
          this.reviews = res.data.reverse()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    PutReviews: function (review) {
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/community/${review.id}/`,
        headers: this.setToken(),
        data: this.profileData
      })
        .then((res) => {
          console.log(res)
          // if (res.data.message === "리뷰수정실패"){
          //   alert('본인글만 수정 가능합니다')
          // }
          // else{
          this.getReviews()
          // }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    deleteReviews: function (review) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${review.id}/`,
        headers: this.setToken(),
        data: this.profileData
      })
        .then((res) => {
          console.log(res)
          if (res.data.message === "리뷰삭제실패"){
            alert('본인글만 삭제 가능합니다')
          }
          else{
            this.getReviews()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    gravatar(mail) {
      const hash = md5(mail.trim().toLowerCase());
      return `https://www.gravatar.com/avatar/${hash}`;
    }

  },

   computed: {
  },

  created: function () {
    if (localStorage.getItem('jwt')) {
      this.getReviews()
      var token = localStorage.jwt
      this.UserName = jwt_decode(token).username
      this.profileData.UserName = jwt_decode(token).username
    } else {
      this.$router.push({name: 'Login'})
    }

  },
}
</script>

<style scoped>
html {
  background-color: #F3EFE4;
}
</style>