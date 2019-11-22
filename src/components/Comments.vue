<template>
	<div>
		<CommentItem v-bind:key="comment.id" v-for="comment in comments" :tweet="tweet" v-bind:comment="comment"/>
	</div>
</template>

<script>
import CommentItem from './CommentItem';
export default {
	name:"Comments",
	props:["comments", "tweet"],
	components:{
		CommentItem
	}
}
</script>

<style>

</style>