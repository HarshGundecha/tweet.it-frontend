<template>
	<div>
		<!-- /.card-comment -->
		<div class="card-comment">
			<!-- User image -->
			<img class="img-circle img-sm" src="@/assets/adminlte300-template/dist/img/user4-128x128.jpg" alt="User Image">

			<div class="comment-text">
				<span class="username">
					{{comment.user.name}}
					<span class="text-muted float-right">{{comment.createdAt | formatDate}}</span>
				</span><!-- /.username -->
				{{comment.commentText}}
			</div>
			<!-- /.comment-text -->
		</div>
		<!-- /.card-comment -->
	</div>
</template>

<script>
export default {
	name:"CommentItem",
	props:["comment"]
}
</script>

<style>

</style>