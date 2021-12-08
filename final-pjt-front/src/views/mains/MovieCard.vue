<template>

<div class="box" style="margin:0px; padding:0px;">
  <div class="card" style=" background-color: black">
    <div class="card-body" style="margin:0px; padding:0px;">
      <!-- <h3 class="card-title">{{ movie.title }}</h3> -->
      <b-button style=" background-color: black" @click="modalopen">
        <!-- Detail -->
        <img class="img-fluid"  v-bind:src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
      </b-button>
    </div>  
  </div>
  <div>
    
    <b-modal v-model="modalShow" size="xl" title="DETAIL"> <!-- 이 안에 어떻게 {{ movie.title}} 넣어요?-->
      <h1 style="font-weight: bold"> {{ movie.title}} </h1>
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <img class="img-fluid" v-bind:src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
            <p style="font-size: 25px; text-align:center; padding:0px 5px 0px 0px" >
              영화 점수:{{movie_vote_average}}
            </p>
          </b-col>
          <b-col>
            <p style="font-size: 25px">{{ movie.overview }}</p>
            <div class="starRev">
              <span @click="onclicks(1)" class="starR ">별1</span>
              <span @click="onclicks(2)" class="starR">별2</span>
              <span @click="onclicks(3)" class="starR">별3</span>
              <span @click="onclicks(4)" class="starR">별4</span>
              <span @click="onclicks(5)" class="starR">별5</span>
              <span @click="onclicks(6)" class="starR">별6</span>
              <span @click="onclicks(7)" class="starR">별7</span>
              <span @click="onclicks(8)" class="starR">별8</span>
              <span @click="onclicks(9)" class="starR">별9</span>
              <span @click="onclicks(10)" class="starR">별10</span>
            </div>
            <button @click="givescore">평점주기</button>
          </b-col>

        </b-row>
      </b-container>
    </b-modal>
  </div>
</div>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
import axios from'axios'


export default {
  name: 'MovieCard',
  components: {

  },
  props: {
    movie: Object
  },
  data: function() {
    return{
      modalShow: false,
      movie_num: null,
      moviescorebool: false,
      movie_rank_num: null,
      movie_vote_average: null,
      movieItem: {
        movietitle: this.movie.title,
      },
      movie_num_rank_Item: {
        movie_id: null,
      },
      movieRankItem: {
        rank: 0,
      },
    }
  },
  methods: {
    modalopen() {
      this.modalShow = !this.modalShow
      this.movie_num_rank_Item.movie_id = this.movie_num
      axios({
      method: 'post',
      url: `http://127.0.0.1:8000/movies/get_rank_info/`,
      data: this.movie_num_rank_Item
        })
        .then((res)=>{
          console.log(res)
          this.movie_rank_num = res.data.rank_pk
          let movie_score = res.data.rank
          const score_stars = document.getElementsByClassName("starR")
          console.log(score_stars)
          for (var m = 0; m < movie_score; m++) {
            const score_star = score_stars[m]
            $(score_star).addClass("on")
          }
        })
    },
    onclicks(num) {
      console.log(num)
      const stars = document.getElementsByClassName("starR")
      for (var i = 0; i < num; i++) {
        const star = stars[i]
        $(star).addClass('on')
      }
      for (var j = num+1; j < 10; j++) {
        const star = stars[j]
        $(star).removeClass('on')
      }
      return false;
    },
    givescore () {
      let score=document.getElementsByClassName("on").length
      this.movieRankItem.rank = score
      if (this.moviescorebool) {
        axios({
          method: 'put',
          url: `http://127.0.0.1:8000/movies/${this.movie_num}/movie_rank/${this.movie_rank_num}/`,
          data: this.movieRankItem,
        })
        .then((res)=>{
          console.log('34567')
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  },
  mounted () {
    axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/movies/get_movie_info/',
          data: this.movieItem,
    })
    .then((res)=>{
      this.movie_num =res.data.movie_pk
      this.movie_vote_average = res.data.vote_average
    })
    .then(()=>{
        axios({
          method: 'get',
          url: `http://127.0.0.1:8000/movies/${this.movie_num}/movie_rank/`,
          // data: this.movieRankItem,
        })
        .then((res)=>{
          if (res.data.length) {
            this.moviescorebool = true
            // console.log(res)
          }
          else {
            axios({
          method: 'post',
          url: `http://127.0.0.1:8000/movies/${this.movie_num}/movie_rank/`,
          data: this.movieRankItem,
            })
          }
        })
    })
    .catch((err) => {
          console.log(err)
        })
    }

    




}
  

</script>

<style scoped>
html {
  background-color: black;
}
.starR{
  background: url('http://miuu227.godohosting.com/images/icon/ico_review.png') no-repeat right 0;
  background-size: auto 100%;
  width: 30px;
  height: 30px;
  display: inline-block;
  text-indent: -9999px;
  cursor: pointer;
}
.starR.on{background-position:0 0;}
</style>