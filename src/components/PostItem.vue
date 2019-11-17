<template>
  <div class="col-md-12">
    <!-- Box Comment -->
    <div class="card card-widget">
      <div class="card-header">
        <div class="user-block">
          <img class="img-circle" src="@/assets/adminlte300-template/dist/img/user1-128x128.jpg" alt="User Image">
          <span class="username"><a href="#">{{tweet.user.name}}</a></span>
          <span class="description">Shared publicly {{tweet.createdAt | formatDate}}</span>
        </div>
        <!-- /.user-block -->
        <div class="card-tools">
          <button type="button" class="btn btn-tool" data-toggle="tooltip" title="Mark as read">
            <i class="far fa-circle"></i></button>
          <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
          </button>
          <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i>
          </button>
        </div>
        <!-- /.card-tools -->
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <Images v-bind:images="tweet.images"/>
        <p>{{tweet.tweetText}}</p>
        <button type="button" class="btn btn-default btn-sm"><i class="fas fa-share"></i> Share</button>
        <button type="button" class="btn btn-default btn-sm"><i class="far fa-thumbs-up"></i> Like</button>
        <span class="float-right text-muted">127 likes - {{tweet.comment.length}} comments</span>
      </div>
      <!-- /.card-body -->
      <div class="card-footer card-comments">
        <Comments v-bind:comments="tweet.comment"/>
      </div>
      <!-- /.card-footer -->
      <div class="card-footer">
        <form @submit.prevent="addComment">
          <img class="img-fluid img-circle img-sm" src="@/assets/adminlte300-template/dist/img/user4-128x128.jpg" alt="Alt Text">
          <!-- .img-push is used to add margin to elements next to floating images -->
          <div class="img-push">
            <input type="text"  v-model="commentText" class="form-control form-control-sm" placeholder="Press enter to post comment">
          </div>
        </form>
      </div>
      <!-- /.card-footer -->
    </div>
    <!-- /.card -->
  </div>
</template>

<script>
import Comments from './Comments';
import Images from './Images';
export default {
  name: 'Post',
  props:["tweet"],
  components:{
    Comments,
    Images
  },
  data(){
    return {
      commentText:'',
    }
  },
  computed:{
    user(){
      return this.$store.getters.get_user;
    }
  },
  methods: {
    addComment() {
      const newComment = {
        commentText: this.commentText,
        user:this.user,
        tweet:{
          id:this.$props.tweet.id
        }
      }
      this.$store.dispatch('post_comment', newComment);
      this.commentText = '';
    }
  }
}
</script>