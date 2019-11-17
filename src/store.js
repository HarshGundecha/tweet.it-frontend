import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
		user : {},
		my_tweets:[]
  },
  mutations: {
		auth_request(state){
			state.status = 'loading'
		},
		auth_success(state, token, user){
			state.status = 'success'
			state.token = token
			state.user = user
		},
		auth_error(state){
			state.status = 'error'
		},
		logout(state){
			state.status = ''
			state.token = ''
		},
		set_my_tweets(state, tweets){
			state.my_tweets = tweets
		},
		set_user(state, user){
			state.user = user
		}		
  },
  actions: {
		login({commit}, user){
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: 'https://tweeterbackend.herokuapp.com/login', data: user, method: 'POST' })
				.then(resp => {
					const token = resp.data.token
					const user = resp.data.user
					localStorage.setItem('token', token)
					axios.defaults.headers.common['Authorization'] = "Bearer "+token
					commit('auth_success', token, user)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		register({commit}, user){
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: 'https://tweeterbackend.herokuapp.com/register', data: user, method: 'POST' })
				.then(resp => {
					const token = resp.data.token
					const user = resp.data.user
					localStorage.setItem('token', token)
					axios.defaults.headers.common['Authorization'] = "Bearer "+token
					commit('set_user', user)
					commit('auth_success', token, user)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error', err)
					localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		logout({commit}){
			return new Promise((resolve) => {
				commit('logout')
				localStorage.removeItem('token')
				delete axios.defaults.headers.common['Authorization']
				resolve()
			})
		},
		get_profile({commit}){
			return new Promise((resolve, reject) => {
				// commit('auth_request')
				axios({url: 'https://tweeterbackend.herokuapp.com/profile', method: 'GET'})
				.then(resp => {
					const tweet = resp.data.tweet
					const user = resp.data.user
					commit('set_user', user)
					commit('set_my_tweets', tweet)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		post_comment({commit}, comment){
			return new Promise((resolve, reject) => {
				axios({url: 'https://tweeterbackend.herokuapp.com/comment', data: comment, method: 'POST' })
				.then(resp => {
					const tweet = resp.data.tweet
					commit('set_my_tweets', tweet)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error', err)
					localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		addTweet({commit}, newTweet){
			return new Promise((resolve, reject) => {
				axios({url: 'https://tweeterbackend.herokuapp.com/tweet', data: newTweet, method: 'POST' })
				.then(resp => {
					const tweet = resp.data.tweet
					commit('set_my_tweets', tweet)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error', err)
					localStorage.removeItem('token')
					reject(err)
				})
			})
		},
	},
  getters : {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
		get_user:state=>state.user,
		get_my_tweets:state=>state.my_tweets,
  }
})