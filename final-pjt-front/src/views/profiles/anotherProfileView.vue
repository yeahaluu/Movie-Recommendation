<template>
  <div>
    <center>
      <h1>{{ nickname }}</h1>
      <div class="mb-2">
      <b-avatar :src="gravatar" size="6rem"></b-avatar>
      </div>
      <div>
        <p sytle="font-weight:bold;">@{{profileData.UserName}}</p>
        <p style="font-size:1.1em;">{{introduce}}</p>
        <p>email : {{email}}</p>
      </div>


<hr>
      <div>
        <h1>내가 쓴 글</h1>
        <!-- <button @click="seeReivewData">click</button> -->
        <button @click="seeReivewData" class="btn"><font-awesome-icon :icon="['far','comment']" size="lg" :style="{ color: 'green' }"/></button>
        <button @click="closeReviewData" class="btn"><font-awesome-icon :icon="['fas','comment-slash']" size="lg" :style="{ color: 'green' }"/></button>
           <ul>
      <li v-for="my_review in my_reviews" :key="`my_review_${my_review.id}`" style="background-color: #F3EFE4; list-style:none; padding:10px;">
         <div class="card" style="margin: auto; width: 90%; padding: 20px;background-color: white;">
          <b-row style="background-color: white; position:relative;">
            <b-col cols="2" style="background-color: white;">
              <b-avatar :src="gravatar_review(my_review.email)" size="6rem"></b-avatar>
            </b-col >
            <b-col cols="8" style="text-align: left; padding:5px; background-color: white;">
              <p><span style="font-weight:bold; font-size: 1.1m;">{{my_review.nickname}}</span> @{{my_review.username}} ㆍ<span style="font-weight:bold; font-size: 0.9m;">{{ my_review.created_at | moment("from", "now") }}</span>ㆍ수정: <span>{{ my_review.updated_at | moment("from", "now") }}</span> </p>
              <p style="font-weight:bold; font-size: 1.2em;">{{ my_review.title }}</p>
              <p style="font-size: 1em;">{{ my_review.content }}</p>              
            </b-col>
            </b-row>
            
          
        </div>
      </li>
    </ul>
     
      </div>

      <!-- <div>
        <h1>내가 쓴 댓글</h1>
        <button @click="seeComment" class="btn"><font-awesome-icon :icon="['far','comment']" size="lg" :style="{ color: 'green' }"/></button>
        <button @click="closeComment" class="btn"><font-awesome-icon :icon="['fas','comment-slash']" size="lg" :style="{ color: 'green' }"/></button>
      </div> -->


    </center>
    <!-- <button @click="getmy_reviews">button</button> -->
  </div>
</template>

<script>
import md5 from "md5";
// import jwt_decode from "jwt-decode"
import axios from'axios'

export default {
  name: "anotherProfile",
  data () {
    return{
      profileData: {
        UserName: '',
      },
      email: '',
      profileImage: '',
      introduce: '',
      my_reviews: null,
    }
  },

  methods: {
    
    getProfileData: function () { 
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/profile_data/',
        data: this.profileData,
      })
        .then((res) => {
          console.log(res.data)
          this.nickname = res.data.nickname
          this.email = res.data.email
          this.profileImage = res.data.profileImage
          this.introduce = res.data.introduce
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getReviewData: function () { 
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/community/review_data/`,
        data: this.profileData
      })
        .then((res) => {
          console.log(res)
          this.my_reviews = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    seeReivewData() {
      console.log(1)
      this.getReviewData()
    },
    closeReviewData() {
      this.my_reviews = null
    },
    // getComments: function () { 
    //   axios({
    //     method: 'get',
    //     url: `http://127.0.0.1:8000/community/${this.reviewId}/comments/`,
    //     headers: this.setToken(),
    //   })
    //     .then((res) => {
    //       this.comments = res.data
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    // seeComment() {
    //   this.getComments()
    // },
    // closeComment() {
    //   this.comments = null
    // },
    gravatar_review(mail) {
      const hash = md5(mail.trim().toLowerCase());
      console.log(hash)
      return `https://www.gravatar.com/avatar/${hash}`;
    }
     
  },

  computed: {
    gravatar() {
      const hash = md5(this.email.trim().toLowerCase());
      console.log(hash)
      return `https://www.gravatar.com/avatar/${hash}`;
    }
  },

  created: function () {
    if (localStorage.getItem('jwt')) {
      var token = sessionStorage.profilename
      this.profileData.UserName = token
      this.getProfileData()
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
div {
  background-color: #F3EFE4;
}
</style>