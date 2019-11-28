import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var apiDomain = 'http://localhost:8888';

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
		user : localStorage.getItem('user') || {},
		otherUser: {},
		myTweets:[],
		users:[],
		searchUsers:[],
		searchText:'',
		isRegistrationBusy:false,
		isLoginBusy:false,
		isPostTweetBusy:false,
  },
  mutations: {
		authRequest(state){
			state.status = 'loading'
		},
		authSuccess(state, token){
			state.status = 'success'
			state.token = token
		},
		authError(state){
			state.status = 'error'
		},
		logout(state){
			state.status = ''
			state.token = ''
		},
		setTweets(state, tweets){
			state.myTweets = tweets
		},
		updateTweets(state, data){
			var ii;
			for(ii=0;state.myTweets && ii<state.myTweets.length && state.myTweets[ii]!=data.oldTweet;ii++);
			if(data.newTweet===true)
				Vue.delete(state.myTweets, ii)
			else
				Vue.set(state.myTweets, ii, data.newTweet)
		},
		setUser(state, user){
			state.user = user
		},
		setOtherUser(state, user){
			state.otherUser = user
		},
		setUsers(state, users){
			state.users = users
		},
		// setSearchUsers(state, searchUsers){
		// 	state.searchUsers = searchUsers
		// },
		setSearchText(state, searchText){
			state.searchText = searchText
		},
		toggleIsRegistrationBusy(state, newFlag){
			state.isRegistrationBusy = newFlag
		},
		toggleIsLoginBusy(state, newFlag){
			state.isLoginBusy = newFlag
		},
		toggleIsPostTweetBusy(state, newFlag){
			state.isPostTweetBusy = newFlag
		},
	},
  actions: {
		// AUTH
		login({commit}, user){
			return new Promise((resolve, reject) => {
				commit('authRequest')
				commit('toggleIsLoginBusy', true)
				axios({url: apiDomain+'/users/login', data: user, method: 'POST' })
				.then(resp => {
					const token = resp.data.token
					const user = resp.data.user
					localStorage.setItem('token', token)
					localStorage.setItem('user', user)
					axios.defaults.headers.common['Authorization'] = "Bearer "+token
					commit('authSuccess', token, user)
					commit('setUser', user)
					resolve(resp)
				})
				.catch(err => {
					commit('authError')
					localStorage.removeItem('token')
					localStorage.removeItem('user')
					reject(err)
				})
				.finally(()=>{
					commit('toggleIsLoginBusy', false)
				})
			})
		},
		register({commit}, user){
			return new Promise((resolve, reject) => {
				commit('authRequest')
				commit('toggleIsRegistrationBusy', true)
				axios({url: apiDomain+'/users/register', data: user, method: 'POST' })
				.then(resp => {
					const token = resp.data.token
					const user = resp.data.user
					localStorage.setItem('token', token)
					localStorage.setItem('user', user)
					axios.defaults.headers.common['Authorization'] = "Bearer "+token
					commit('setUser', user)
					commit('authSuccess', token, user)
					resolve(resp)
				})
				.catch(err => {
					commit('authError', err)
					localStorage.removeItem('token')
					localStorage.removeItem('user')
					reject(err)
				})
				.finally(()=>{
					commit('toggleIsRegistrationBusy', false)
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
		getProfile({commit}, username){
			return new Promise((resolve, reject) => {
				axios({url: apiDomain+'/users/profile/'+username, method: 'GET'})
				.then(resp => {
					const tweet = resp.data.tweet
					const anyUser = resp.data.user
					commit('setOtherUser', anyUser)
					commit('setTweets', tweet)
					resolve(resp)
				})
				.catch(err => {
					commit('authError')
					reject(err)
				})
			})
		},
		getFeeds({commit}){
			return new Promise((resolve, reject) => {
				axios({url: apiDomain+'/tweets/feeds', method: 'GET'})
				.then(resp => {
					const tweet = resp.data.tweet
					commit('setTweets', tweet)
					resolve(resp)
				})
				.catch(err => {
					commit('authError')
					reject(err)
				})
			})
		},
		// Profile //


		// User
		putUser({commit, dispatch}, updatedUser){
			return new Promise((resolve, reject) => {
				axios({url: apiDomain+'/users', data:updatedUser, method: 'PUT'})
				.then(resp => {
					dispatch("getProfile", this.getters.otherUser.username);
					resolve(resp)
				})
				.catch(err => {
					commit('authError')
					reject(err)
				})
			})
		},
		users({commit}, searchText=false){
			return new Promise((resolve, reject) => {
				var endPoint = !searchText || searchText==' '?'':'/search/'+searchText;
				axios({url: apiDomain+'/users'+endPoint, method: 'GET'})
				.then(resp => {
					const users = resp.data.users
					commit('setUsers', users)
					resolve(resp)
				})
				.catch(err => {
					commit('authError')
					reject(err)
				})
			})
		},
		setSearchText({commit}, searchText){
			commit('setSearchText', searchText)
		},
		toggleFollow({commit}, userId){
			return new Promise((resolve, reject) => {
				axios({url: 'http://localhost:8888/togglefollow/'+userId, method: 'GET'})
				.then(resp => {
					commit('setOtherUser', resp.data)
					resolve(resp)
				})
				.catch(err => {
					commit('authError')
					reject(err)
				})
			})
		},
		// User //

		// Tweet common
		deleteSomethingInTweet({commit}, data){
			return new Promise((resolve, reject) => {
				axios({url: data.link, method: 'DELETE'})
				.then(resp => {
					commit('updateTweets', {oldTweet:data.data, newTweet:resp.data})
					resolve(resp)
				})
				.catch(err => {
					commit('authError')
					reject(err)
				})
			})
		},
		putPostSomethingInTweet({commit}, data){
			return new Promise((resolve, reject) => {
				commit(data.toggle, true)
				axios({url: data.link, data:data.data, method: data.method })
				.then(resp => {
					commit('updateTweets', {oldTweet:data.data, newTweet:resp.data})
					resolve(resp)
				})
				.catch(err => {
					commit('authError', err)
					reject(err)
				})
				.finally(()=>{
					commit(data.toggle, false)
				})
			})
		},
		// Tweet common //

		// Tweet
		postTweet({dispatch}, newTweet){
			dispatch('putPostSomethingInTweet', {link:apiDomain+'/tweets', method:'POST', data:newTweet, toggle:'toggleIsPostTweetBusy'})
		},
		deleteTweet({dispatch}, tweet){
			dispatch('deleteSomethingInTweet', {link:apiDomain+'/tweets/'+tweet.id, data:tweet})
		},
		toggleTweetLike({dispatch}, tweet){
			dispatch('putPostSomethingInTweet', {link:apiDomain+'/tweets/'+tweet.id+'/togglelike' , method:'PUT', data:tweet})
		},


		// Comment common
		deleteSomethingInComment({commit}, data){
			return new Promise((resolve, reject) => {
				axios({url: data.link, method: 'DELETE'})
				.then(resp => {
					commit('updateTweets', {oldTweet:data.tweet, newTweet:resp.data})
					resolve(resp)
				})
				.catch(err => {
					commit('authError')
					reject(err)
				})
			})
		},
		putPostSomethingInComment({commit}, data){
			return new Promise((resolve, reject) => {
				axios({url: data.link, data:data.data, method: data.method })
				.then(resp => {
					commit('updateTweets', {oldTweet:data.tweet, newTweet:resp.data})
					resolve(resp)
				})
				.catch(err => {
					commit('authError', err)
					reject(err)
				})
			})
		},
		// Comment common //

		// Comment
		postComment({dispatch}, data){
			dispatch('putPostSomethingInComment', {link:apiDomain+'/comments', method:'POST', data:data[1], tweet:data[0]})
		},
		deleteComment({ dispatch}, data){
			dispatch('deleteSomethingInComment', {link:apiDomain+'/comments/'+data[1].id, data:data[1], tweet:data[0]})
		},
		toggleCommentLike({ dispatch}, data){
			dispatch('putPostSomethingInComment', {link:apiDomain+'/comments/'+data[1].id+'/togglelike' , method:'PUT', data:data[1], tweet:data[0]})
		},
		// Comment //
	},

	getters : {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
		user:state=>state.user,
		users:state=>state.users,
		otherUser:state=>state.otherUser,
		tweets:state=>state.myTweets,
		searchText:state=>state.searchText,
		isRegistrationBusy:state=>state.isRegistrationBusy,
		isLoginBusy:state=>state.isLoginBusy,
		isPostTweetBusy:state=>state.isPostTweetBusy,
	}
})