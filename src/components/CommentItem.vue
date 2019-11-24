<template>

		<!-- /.card-comment -->
		<div class="card-comment">
			<!-- User image -->
			<img class="img-circle img-sm" src="@/assets/adminlte300-template/dist/img/user4-128x128.jpg" alt="User Image">

			<div class="comment-text">
				<span class="username">
					{{comment.user.name}}
					<span class="text-muted float-right">
						{{comment.createdAt | formatDate}}
						<button class="btn btn-primary btn-xs" v-on:click="toggleCommentLike" ><i class="fa fa-thumbs-up">&nbsp;{{comment.likes?comment.likes.length || 0 : 0 }}</i>
						</button>&nbsp;
						<button v-if="user.username==comment.user.username" class="btn btn-danger btn-xs" data-toggle="modal" :data-target="'#modal-sm-comment'+comment.id"><i class="fa fa-trash"></i></button>&nbsp;

						

						<div v-if="user.username==comment.user.username" class="modal fade" :id="'modal-sm-comment'+comment.id" style="display: none;" aria-hidden="true">
							<div class="modal-dialog modal-sm">
								<div class="modal-content">
									<div class="modal-header">
										<h4 class="modal-title">Delete Tweet</h4>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">×</span>
										</button>
									</div>
									<div class="modal-body">
										<p class="">Are you sure ypu want to delete this comment ?</p>
									</div>
									<div class="modal-footer justify-content-between">
										<button type="button" class="btn btn-default" data-dismiss="modal">No</button>
										<button v-on:click="deleteComment" type="button" data-dismiss="modal" class="btn btn-primary">Yes</button>
									</div>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->
						</div>
					</span>
				</span><!-- /.username -->
				{{comment.commentText}}
			</div>
			<!-- /.comment-text -->
		</div>
		<!-- /.card-comment -->
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name:"CommentItem",
	props:["comment", "tweet"],
	computed:{
    ...mapGetters([
      'user'
    ]),
	},
	methods:{
		toggleCommentLike(){
      this.$store.dispatch("toggleCommentLike", [this.tweet, this.comment]);
		},
		deleteComment(){
      this.$store.dispatch("deleteComment", [this.tweet, this.comment]);
		},
},
}
</script>

<style>

</style>