import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//fort-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faComment as farComment} from '@fortawesome/free-regular-svg-icons'
import { faCommentSlash as fasCommentSlash} from '@fortawesome/free-solid-svg-icons'
import { faFilm as fasFilm} from '@fortawesome/free-solid-svg-icons'

import vueMoment from 'vue-moment' 
Vue.use(vueMoment)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

library.add(
  farComment,
  fasCommentSlash,
  fasFilm,
)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
