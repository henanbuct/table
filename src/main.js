import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(ElementUI, {
  size: 'small'
});
Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
