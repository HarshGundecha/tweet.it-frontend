import Vue from 'vue'
import App from './App.vue'
import "@/assets/adminlte300-template/plugins/fontawesome-free/css/all.min.css";
import "@/assets/adminlte300-template/dist/css/adminlte.min.css";
import '@/assets/adminlte300-template/dist/js/adminlte.min.js';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
