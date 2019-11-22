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
		updateTweets(state, data){
			var ii;
			for(ii=0;state.my_tweets && ii<state.my_tweets.length && state.my_tweets[ii]!=data.oldTweet;ii++);
			if(data.newTweet===true)
				Vue.delete(state.my_tweets, ii)
			else
				Vue.set(state.my_tweets, ii, data.newTweet)
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
		// AUTH
		login({commit, getters}, user){
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: 'https://tweeterbackend.herokuapp.com/users/login', data: user, method: 'POST' })
				.then(resp => {
					const token = resp.data.token
					const user = resp.data.user
					localStorage.setItem('token', token)
					localStorage.setItem('user', user)
					axios.defaults.headers.common['Authorization'] = "Bearer "+token
					commit('auth_success', token, user)
					commit('setUser', user)
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
				axios({url: 'https://tweeterbackend.herokuapp.com/users/register', data: user, method: 'POST' })
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
		// AUTH //


		// Profile
		getProfile({commit, getters}, username){
			return new Promise((resolve, reject) => {
				axios({url: 'https://tweeterbackend.herokuapp.com/users/profile/'+username, method: 'GET'})
				.then(resp => {
					const tweet = resp.data.tweet
					const anyUser = resp.data.user
					commit('setOtherUser', anyUser)
					commit('set_my_tweets', tweet)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					reject(err)
				})
			})
		},
		getFeeds({commit, dispatch, getters}){
			return new Promise((resolve, reject) => {
				axios({url: 'https://tweeterbackend.herokuapp.com/tweets/feeds', method: 'GET'})
				.then(resp => {
					const tweet = resp.data.tweet
					commit('set_my_tweets', tweet)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					reject(err)
				})
			})
		},
		// Profile //


		// User
		putUser({commit, dispatch, getters}, updatedUser){
			return new Promise((resolve, reject) => {
				axios({url: 'https://tweeterbackend.herokuapp.com/users', data:updatedUser, method: 'PUT'})
				.then(resp => {
					dispatch("getProfile", this.getters.getOtherUser.username);
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					reject(err)
				})
			})
		},
		searchUser({commit}, searchText){
			return new Promise((resolve, reject) => {
				axios({url: 'https://tweeterbackend.herokuapp.com/users/search/'+searchText, method: 'GET'})
				.then(resp => {
					commit('setSearchUsers', resp.data.searchUsers)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					reject(err)
				})
			})
		},
		getUsers({commit}){
			return new Promise((resolve, reject) => {
				axios({url: 'https://tweeterbackend.herokuapp.com/users', method: 'GET'})
				.then(resp => {
					const users = resp.data.users
					commit('set_users', users)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					reject(err)
				})
			})
		},
		setSearchText({commit}, searchText){
			commit('setSearchText', searchText)
		},
		// User //

		// Tweet common
		deleteSomethingInTweet({commit, getters}, data){
			return new Promise((resolve, reject) => {
				axios({url: data.link, method: 'DELETE'})
				.then(resp => {
					commit('updateTweets', {oldTweet:data.data, newTweet:resp.data})
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					reject(err)
				})
			})
		},
		putPostSomethingInTweet({commit, getters}, data){
			return new Promise((resolve, reject) => {
				axios({url: data.link, data:data.data, method: data.method })
				.then(resp => {
					commit('updateTweets', {oldTweet:data.data, newTweet:resp.data})
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error', err)
					reject(err)
				})
			})
		},
		// Tweet common //

		// Tweet
		addTweet({commit, dispatch}, newTweet){
			dispatch('putPostSomethingInTweet', {link:'https://tweeterbackend.herokuapp.com/tweets', method:'POST', data:newTweet})
		},
		deleteTweet({commit, dispatch}, tweet){
			dispatch('deleteSomethingInTweet', {link:'https://tweeterbackend.herokuapp.com/tweets/'+tweet.id, data:tweet})
		},
		toggleTweetLike({commit, dispatch, getters}, tweet){
			dispatch('putPostSomethingInTweet', {link:'https://tweeterbackend.herokuapp.com/tweets/'+tweet.id+'/togglelike' , method:'PUT', data:tweet})
		},


		// Comment common
		deleteSomethingInComment({commit, getters}, data){
			return new Promise((resolve, reject) => {
				axios({url: data.link, method: 'DELETE'})
				.then(resp => {
					commit('updateTweets', {oldTweet:data.tweet, newTweet:resp.data})
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error')
					reject(err)
				})
			})
		},
		putPostSomethingInComment({commit, getters}, data){
			return new Promise((resolve, reject) => {
				axios({url: data.link, data:data.data, method: data.method })
				.then(resp => {
					commit('updateTweets', {oldTweet:data.tweet, newTweet:resp.data})
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error', err)
					reject(err)
				})
			})
		},
		// Comment common //

		// Comment
		post_comment({commit,dispatch, getters}, data){
			dispatch('putPostSomethingInComment', {link:'https://tweeterbackend.herokuapp.com/comments', method:'POST', data:data[1], tweet:data[0]})
		},
		deleteComment({commit, dispatch, getters}, data){
			dispatch('deleteSomethingInComment', {link:'https://tweeterbackend.herokuapp.com/comments/'+data[1].id, data:data[1], tweet:data[0]})
		},
		toggleCommentLike({commit, dispatch, getters}, data){
			dispatch('putPostSomethingInComment', {link:'https://tweeterbackend.herokuapp.com/comments/'+data[1].id+'/togglelike' , method:'PUT', data:data[1], tweet:data[0]})
		},
		// Comment //
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