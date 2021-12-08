<template>
<div id="background">

  <center>
    
    <h1 style="font-family: 'Euphoria Script', cursive; font-size: 6em;">Today Movie</h1>
    <!-- <img width="500" height="500" src="../../../image/1.png" alt=""> -->
    <h3 style="font-family: 'Nanum Brush Script', cursive; font-size: 2em; padding: 250px 0px 0px 0px; ">오늘 기분이 어때요?</h3>
    <section style="top:-440px;">
      
      <img src="../../../image/까칠이.png" alt="comet" class="layer comet" data-speed="-7">
      <img src="../../../image/버럭이.png" alt="earth" class="layer oneP" data-speed="8">
      <img src="../../../image/소심이.png" alt="jupiter" class="layer twoP" data-speed="14">
      <img src="https://raw.githubusercontent.com/DivineBlow/nodeJS/master/Planets/Mars%404x.png" alt="mars" class="layer threeP" data-speed="8">
      <img src="https://raw.githubusercontent.com/DivineBlow/nodeJS/master/Planets/Mercury%404x.png" alt="mercury" class="layer fourP" data-speed="3">
      
      <b-row style="margin:0px; padding:0px; width:50%;">
        <b-col cols="10" style="margin:0px; padding:0px; width:100%;">
          <select id="feel" class="form-select " aria-label="Default select example">
            <option value="">선택해주세요</option>
              <option value="버럭">스트레스를 풀고 싶은 '버럭이'</option>
              <option value="까칠">예민하고 까칠한 시간을 보낸 '까칠이'</option>
              <option value="기쁨">하루종일 기분 좋은 '기쁨이'</option>
              <option value="소심">짜임새 깊은 명작을 좋아하는 '소심이'</option>
              <option value="슬픔">오늘은 눈물을 흘리고 싶은 '슬픔이'</option>
          </select>
        </b-col>
        <b-col cols="2" style="margin:0px; padding:0px; width:100%; background-color:#E7ADF9;">
          <button @click="onclick" class="btn btn-success" style="margin:10px;"><font-awesome-icon :icon="['fas','film']" size="lg" :style="{ color: 'white' }"/></button>
        </b-col>
      </b-row>
      <img src="https://raw.githubusercontent.com/DivineBlow/nodeJS/master/Planets/Moon%404x.png" alt="moon" class="layer fiveP" data-speed="8">
      <img src="https://raw.githubusercontent.com/DivineBlow/nodeJS/master/Planets/Neptune%404x.png" alt="neptune" class="layer sixP" data-speed="10">
      <img src="https://raw.githubusercontent.com/DivineBlow/nodeJS/master/Planets/Pluto%404x.png" alt="pluto" class="layer sevenP" data-speed="-5">
      <img src="../../../image/joy.png" alt="saturn" class="layer eightP" data-speed="-3">
      <img src="../../../image/슬픔이.png" alt="sun" class="layer sun" data-speed="-4">
      <img src="https://raw.githubusercontent.com/DivineBlow/nodeJS/master/Planets/Uranus%404x.png" alt="uranus" class="layer nineP" data-speed="15">
      <img src="https://raw.githubusercontent.com/DivineBlow/nodeJS/master/Planets/Venus%404x.png" alt="venus" class="layer tenP" data-speed="-11">
      
      
    </section>
    

 <b-modal v-model="modalShow" size="xl" title="DETAIL"> <!-- 이 안에 어떻게 {{ movie.title}} 넣어요?-->
      <h1 style="font-weight: bold"> {{ movie.title}} </h1>
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <img class="img-fluid" v-bind:src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
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
            <!-- <button @click="givescore">평점주기</button> -->
          </b-col>

        </b-row>
      </b-container>
    </b-modal>
    <!-- 변수 확인 버튼
    <button @click="onclick" class="btn y" style="margin:20px; background-color: gray; color:white;">다른 영화 추천해주세요</button> -->
  </center>  
</div>
</template>


<script>
import axios from'axios'
import _ from 'lodash'

export default {
  name: "MovieRecommendation",
  data () {
    return{
      modalShow: false,
      weather: '',
      night: false,
      feel: '',
      movie: [],
      recommend_genres: [],
      recommend_genre: null,
      random:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,17,19],
      select_random:'',
    }
  },
  methods: {
    onclick () {
        // 기분 설정 
        this.feel = document.getElementById("feel").options[document.getElementById("feel").options.selectedIndex].value
          if (this.feel === '버럭'){
          if (this.weather === 'bad') {
            this.recommend_genres = [27,80,10752,53]
          } else {
            if (this.night) {
              this.recommend_genres = [18,99,16,878]
            } else{
              this.recommend_genres = [12,37,28,14]
            }
          }
          } else if (this.feel === '까칠'){
          if (this.weather === 'bad') {
            this.recommend_genres = [18,10402]
          } else {
            if (this.night) {
              this.recommend_genres = [35,18,10749]
            } else{
              this.recommend_genres = [16,12]
            }
          }
          } else if (this.feel === '기쁨'){
          if (this.weather === 'bad') {
            this.recommend_genres = [28,12,16]
          } else {
            if (this.night) {
              this.recommend_genres = [10751,99]
            } else{
              this.recommend_genres = [10402,35]
            }
          }
          } else if (this.feel === '소심'){
          if (this.weather === 'bad') {
            this.recommend_genres = [53,10752]
          } else {
            if (this.night) {
              this.recommend_genres = [878,9648]
            } else{
              this.recommend_genres = [80,36]
            }
          }
          } else if (this.feel === '슬픔'){
          if (this.weather === 'bad') {
            this.recommend_genres = [99]
          } else {
            if (this.night) {
              this.recommend_genres = [16]
            } else{
              this.recommend_genres = [18]
            }
          } 
          } else {
            alert('기분을 선택해주세요')
            return 0
          }

      // 페이지 난수 설정
      this.recommend_genre = _.sample(this.recommend_genres)
      this.select_random = _.sample(this.random)

      // api 영화정보 받기
      axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/popular?api_key=6b1e9899f17fa92429f5a793999dcb8f&page=${this.select_random}`,
      })
      .then((res)=>{
        console.log(res)
          for (var i = 0; i < 20; i++) {
          for (var j=0; j < res.data.results[i].genre_ids.length; j++) {
            if (res.data.results[i].genre_ids[j] === parseInt(this.recommend_genre)) {
              this.movie = res.data.results[i]
            }
          }
        }
        console.log('오류나면 기분이 버럭인지 확인 할 것!!!!!!!!!!!!')
        this.modalShow = !this.modalShow
        // console.log(this.movie)
      })
      .catch((err) => {
        console.log(err)
      })
  },
},
  created: function () {
    document.addEventListener("mousemove", parallax);
    function parallax(e) {
      this.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        
        const x = (window.innerWidth - e.pageX * speed)/100;
        const y = (window.innerHeight - e.pageY * speed)/100;
        
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
      })
    }
    axios({
        method: 'get',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=207f21f1a38f7c9e74fc8f80d6381069',
      })
        .then((res) => {
          var today = new Date();
          
          // 시간 설정
          if (today.getHours() >= 9) {
            this.night = true
          }

          // 날씨 설정
          if (res.data.weather[0].main === 'clear'){
            this.weather = 'good'
          } else if (this.weather === 'clouds') {
            this.weather = 'good'
          } else {
            this.weather = 'bad'
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
}

</script>
<style scope>
  #container {
    position:relative;
    top: 300px;
  }
  #background {
    background-image:url("../../../image/배경2.jpeg");
    background-size: cover
  }
  /* select#feel option[value="버럭"]   { background-color: red;   } */
/* select#feel option[value="others"] { background-image:url(others.png); }  */
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
<style scope lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Euphoria+Script&display=swap');
@import url(//fonts.googleapis.com/earlyaccess/nanumbrushscript.css);


body {
  background: #031323;
  background: url(https://raw.githubusercontent.com/DivineBlow/nodeJS/master/Planets/Background.png);
  background-size: cover;
  background-repeat: no-repeat;
}

h2 {
    font-family: 'Nanum Brush Script', cursive;
    position: relative;
    color: #fff;
    font-size: 10vw;
    z-index: -10;
  }

section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  
  h2 {
    position: relative;
    color: #fff;
    font-size: 10vw;
    z-index: -10;
  }
  
  img {
    position: absolute;
    width: 10vw;
    height: auto;
  }
  
  .comet {
    top: 5%;
    left: 5%;
  }
  
  .oneP {
    width: 8vw;
    top: 15%;
    left: 40%;
  }
  
  .twoP {
    width: 15vw;;
    top: 65%;
    left: 40%;
  }
  
  .threeP {
    width: 5vw;
    bottom: 5%;
    right: 30%;
  }
  
  .fourP {
    width: 4vw;
    left: 20%;
    bottom: 20%;
  }
  
  .fiveP {
    width: 3vw;
    top: 15%;
    left: 50%;
  }
  
  .sixP {
    width: 8vw;
    right: 15%;
    bottom: 40%;
  }
  
  .sevenP {
    width: 2.5vw;
    left: 5%;
    bottom: 7%;
  }
  
  .eightP {
    width: 18vw;;
    top: 40%;
    left: 3%;
  }
  
  .nineP {
    width: 10vw;
    top: 30%;
    right: 30%;
  }
  
  .tenP {
    width: 7vw;
    right: 10%;
    bottom: 20%;
  }
  
  .sun {
    width: 25vw;
    top: 0%;
    right: 2%;
  }
}
</style>
