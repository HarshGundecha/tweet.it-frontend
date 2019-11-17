<template>
	<div>
		<div v-bind:key="tweet.id" v-for="tweet in my_tweets">
			<PostItem v-bind:tweet="tweet"/>
		</div>
	</div>
</template>

<script>
import PostItem from './PostItem'
export default {
    name: 'Posts',
		components:{
			PostItem
		},
		props:["my_tweets"]
}
</script>