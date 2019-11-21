import Vue from 'vue'
import App from './App.vue'
import Router from './router';
import Store from './store';
import Axios from 'axios'
import moment from 'moment';
import "@/assets/adminlte300-template/plugins/fontawesome-free/css/all.min.css";
import "@/assets/adminlte300-template/dist/css/adminlte.min.css";
import '@/assets/adminlte300-template/dist/js/adminlte.min.js';
Vue.config.productionTip = false


Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer "+token
}

Vue.filter('formatDate', function(value) {
  if (value){
    return moment(moment(String(value)).format('MM/DD/YYYY hh:mm')).fromNow()
  }
});

new Vue({
  render: h => h(App),
  router: Router, // Router added to the Vue instance
  store:Store
}).$mount('#app')
