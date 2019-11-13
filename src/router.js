import Vue from 'vue'
import Login from './components/Login';
import Register from './components/Register';
import ContentWrapper from './components/shared/ContentWrapper';
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/', 
      component: ContentWrapper, 
      // alias: '/alias' // When entering '/alias' the content of the component Users will render
		},
    { 
      path: '/login', 
      component: Login, 
      // alias: '/alias' // When entering '/alias' the content of the component Users will render
		},
    { 
      path: '/register', 
      component: Register, 
      // alias: '/alias' // When entering '/alias' the content of the component Users will render
		},
	]
})
