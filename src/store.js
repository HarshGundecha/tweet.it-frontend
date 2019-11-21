import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
		user : {},
		otherUser: {},
		my_tweets:[],
		users:[],
		searchUsers:[],
		searchText:''
  },
  mutations: {
		auth_request(state){
			state.status = 'loading'
		},
		auth_success(state, token, user){
			state.status = 'success'
			state.token = token
			// state.user = user
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
		setUser(state, user){
			state.user = user
		},
		setOtherUser(state, user){
			state.otherUser = user
		},
		set_users(state, users){
			state.users = users
		},
		setSearchUsers(state, searchUsers){
			state.searchUsers = searchUsers
		},
		setSearchText(state, searchText){
			state.searchText = searchText
		},		
  },
  actions: {
		login({commit, getters}, user){
			return new Promise((resolve, reject) => {
				commit('auth_request')
				// axios({url: 'https://tweeterbackend.herokuapp.com/users/login', data: user, method: 'POST' })
				axios({url: 'http://localhost:8888/users/login', data: user, method: 'POST' })
				.then(resp => {
					const token = resp.data.token
					const user = resp.data.user
					localStorage.setItem('token', token)
					localStorage.setItem('user', user)
					axios.defaults.headers.common['Authorization'] = "Bearer "+token
					commit('auth_success', token, user)
					commit('setUser', user)
					// console.log("user "+getters.get_user.username)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					localStorage.removeItem('token')
					localStorage.removeItem('user')
					reject(err)
				})
			})
		},
		register({commit}, user){
			return new Promise((resolve, reject) => {
				commit('auth_request')
				// axios({url: 'https://tweeterbackend.herokuapp.com/users/register', data: user, method: 'POST' })
				axios({url: 'http://localhost:8888/users/register', data: user, method: 'POST' })
				.then(resp => {
					const token = resp.data.token
					const user = resp.data.user
					localStorage.setItem('token', token)
					localStorage.setItem('user', user)
					axios.defaults.headers.common['Authorization'] = "Bearer "+token
					commit('setUser', user)
					commit('auth_success', token, user)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error', err)
					localStorage.removeItem('token')
					localStorage.removeItem('user')
					reject(err)
				})
			})
		},
		logout({commit}){
			return new Promise((resolve) => {
				commit('logout')
				localStorage.removeItem('token')
				localStorage.removeItem('user')
				delete axios.defaults.headers.common['Authorization']
				resolve()
			})
		},
		getProfile({commit, getters}, username){
			return new Promise((resolve, reject) => {
				// commit('auth_request')
				// axios({url: 'https://tweeterbackend.herokuapp.com/users/profile', method: 'GET'})
				axios({url: 'http://localhost:8888/users/profile/'+username, method: 'GET'})
				.then(resp => {
					const tweet = resp.data.tweet
					const anyUser = resp.data.user
					commit('setOtherUser', anyUser)
					commit('set_my_tweets', tweet)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					// localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		post_comment({commit,dispatch}, data2){
			return new Promise((resolve, reject) => {
				// axios({url: 'https://tweeterbackend.herokuapp.com/comments', data: comment, method: 'POST' })
				axios({url: 'http://localhost:8888/comments', data:data2[0], method: 'POST' })
				.then(resp => {
					if(data2.length==1)
						dispatch("getProfile", this.getters.getOtherUser.username);
					else
						dispatch(data2[1]);
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error', err)
					// localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		addTweet({commit, dispatch}, newTweet){
			return new Promise((resolve, reject) => {
				// axios({url: 'https://tweeterbackend.herokuapp.com/tweets', data: newTweet, method: 'POST' })
				axios({url: 'http://localhost:8888/tweets', data: newTweet, method: 'POST' })
				.then(resp => {
					dispatch("getProfile", this.getters.getOtherUser.username);
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error', err)
					// localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		getUsers({commit}){
			return new Promise((resolve, reject) => {
				// commit('auth_request')
				// axios({url: 'https://tweeterbackend.herokuapp.com/users', method: 'GET'})
				axios({url: 'http://localhost:8888/users', method: 'GET'})
				.then(resp => {
					const users = resp.data.users
					commit('set_users', users)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					// localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		toggleTweetLike({commit, dispatch, getters}, tweetId){
			return new Promise((resolve, reject) => {
				// commit('auth_request')
				// axios({url: 'https://tweeterbackend.herokuapp.com/users', method: 'GET'})
				axios({url: 'http://localhost:8888/tweets/'+tweetId+'/togglelike', method: 'PUT'})
				.then(resp => {
					dispatch("getProfile", this.getters.getOtherUser.username);
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					// localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		toggleCommentLike({commit, dispatch, getters}, commentId){
			return new Promise((resolve, reject) => {
				// commit('auth_request')
				// axios({url: 'https://tweeterbackend.herokuapp.com/users', method: 'GET'})
				axios({url: 'http://localhost:8888/comments/'+commentId+'/togglelike', method: 'PUT'})
				.then(resp => {
					dispatch("getProfile", this.getters.getOtherUser.username);
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					// localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		putUser({commit, dispatch, getters}, updatedUser){
			return new Promise((resolve, reject) => {
				// commit('auth_request')
				// axios({url: 'https://tweeterbackend.herokuapp.com/users', method: 'GET'})
				axios({url: 'http://localhost:8888/users', data:updatedUser, method: 'PUT'})
				.then(resp => {
					dispatch("getProfile", this.getters.getOtherUser.username);
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					// localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		searchUser({commit}, searchText){
			return new Promise((resolve, reject) => {
				// commit('auth_request')
				// axios({url: 'https://tweeterbackend.herokuapp.com/users', method: 'GET'})
				axios({url: 'http://localhost:8888/users/search/'+searchText, method: 'GET'})
				.then(resp => {
					// console.log(resp);
					commit('setSearchUsers', resp.data.searchUsers)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					// localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		setSearchText({commit}, searchText){
			// console.log("received search commit "+searchText);
			commit('setSearchText', searchText)
		},
		deleteTweet({commit}, tweetId){
			return new Promise((resolve, reject) => {
				// commit('auth_request')
				// axios({url: 'https://tweeterbackend.herokuapp.com/users', method: 'GET'})
				axios({url: 'http://localhost:8888/tweets/'+tweetId, method: 'DELETE'})
				.then(resp => {
					// console.log(resp);
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					// localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		deleteComment({commit, dispatch, getters}, commentId){
			return new Promise((resolve, reject) => {
				// commit('auth_request')
				// axios({url: 'https://tweeterbackend.herokuapp.com/users', method: 'GET'})
				axios({url: 'http://localhost:8888/comments/'+commentId, method: 'DELETE'})
				.then(resp => {
					// console.log(resp);
					dispatch("getProfile", this.getters.getOtherUser.username);
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					// localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		getFeeds({commit, dispatch, getters}){
			return new Promise((resolve, reject) => {
				// commit('auth_request')
				// axios({url: 'https://tweeterbackend.herokuapp.com/users', method: 'GET'})
				axios({url: 'http://localhost:8888/tweets/feeds', method: 'GET'})
				.then(resp => {
					// console.log(resp);
					const tweet = resp.data.tweet
					commit('set_my_tweets', tweet)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					// localStorage.removeItem('token')
					reject(err)
				})
			})
		},
	},
  getters : {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
		get_user:state=>state.user,
		getOtherUser:state=>state.otherUser,
		getUsers:state=>state.users,
		get_my_tweets:state=>state.my_tweets,
		getSearchUsers:state=>state.searchUsers,
		getSearchText:state=>state.searchText,
	}
})