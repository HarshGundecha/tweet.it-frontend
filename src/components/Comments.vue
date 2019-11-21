<template>
	<div>
		<CommentItem v-bind:key="comment.id" v-for="comment in comments" v-bind:comment="comment"/>
	</div>
</template>

<script>
import CommentItem from './CommentItem';
export default {
	name:"Comments",
	props:["comments"],
	components:{
		CommentItem
	}
}
</script>

<style>

</style>