import Vue from 'vue'
import Login from './components/Login';
import Register from './components/Register';
import ContentWrapper from './components/shared/ContentWrapper';
import Router from 'vue-router'
import store from './store'

Vue.use(Router)


let router = new Router({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      component: ContentWrapper, 
      meta: { 
        requiresAuth: true
      }
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
});

export default router;