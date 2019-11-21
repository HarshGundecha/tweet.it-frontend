import Vue from 'vue'
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';
import Search from './components/Search';
import ContentWrapper from './components/shared/ContentWrapper';
import Profile from './components/Profile';
import Router from 'vue-router'
import store from './store'

Vue.use(Router)


let router = new Router({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      component: ContentWrapper, 
      redirect:'/feeds',
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
    // { 
    //   path: '/profile', 
    //   component: Profile, 
    //   meta: { 
    //     requiresAuth: true
    //   }
		// },
    { 
      path: '/users', 
      component: Users, 
      meta: { 
        requiresAuth: true
      }
		},
    { 
      path: '/search/:searchText?', 
      component: Search, 
      name:'search',
      meta: { 
        requiresAuth: true
      },
      props:true
		},
    { 
      path: '/profile/:username', 
      component: Profile, 
      name:'profile',
      meta: { 
        requiresAuth: true
      },
      props:true
		},
    { 
      path: '/feeds', 
      component: Profile, 
      name:'feeds',
      meta: { 
        requiresAuth: true
      },
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
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/profile')  
  }
});

export default router;