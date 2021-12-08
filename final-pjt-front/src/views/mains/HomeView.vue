<template>
  <div style="background-color: #000000">
    <!-- <Slider/> -->
    <h1> Movies </h1>
    <div class= "row g-1 row-cols-xs-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4" style=" margin:0px; padding:0px; background-color: #000000;">
        <MovieCard v-for="(movie,idx) in movies" :key="idx" :movie="movie" />
    </div>
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue'
// import Slider from './Slider.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: { 
    MovieCard,
    // Slider,
    },
  data: function(){
    return { 
      movies: [],
      color_black: true,
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

    getMovies() {
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=6b1e9899f17fa92429f5a793999dcb8f') 
      .then((res) => {this.movies = res.data.results})
    },

    saveMovies() {
      axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/movies/save/',
          headers: this.setToken()
        })
        .then((res) => {
          console.log(res)
          localStorage.setItem('saveMoviesCheck', true)
        })
        .catch((err) => {console.log(err)})
      } 
    },
  
  mounted: function() {
    this.getMovies()
    if (localStorage.saveMoviesCheck){
      console.log('movie already is saved')
    } else {
      this.saveMovies()
    }
  }

}
</script>

<style scoped>
html {
  background-color: black;
}
#nav {
  background-color: black;
  color:white;
}
</style>



