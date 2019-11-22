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
          <button v-if="user.username==tweet.user.username" type="button" class="btn btn-tool" data-toggle="modal" :data-target="'#modal-sm'+tweet.id"><i data-toggle="tooltip" title="delete tweet" class="fas fa-times"></i>
          </button>
      <!-- <button type="button" class="btn btn-default" data-toggle="modal" :data-target="'#modal-sm'+tweet.id">
        Launch Small Modal
      </button> -->
          <div v-if="user.username==tweet.user.username" class="modal fade" :id="'modal-sm'+tweet.id" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-sm">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Delete Tweet</h4>
                  <span v-if="user.username==otherUser.username">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>                    
                  </span>
                </div>
                <div class="modal-body">
                  <p>Are you sure ypu want to delete this tweet ?</p>
                </div>
                <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                  <button v-on:click="deleteTweet" type="button" data-card-widget="remove" data-dismiss="modal" class="btn btn-primary">Yes</button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
        </div>
        <!-- /.card-tools -->
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <Images v-bind:images="tweet.images"/>
        <p>{{tweet.tweetText}}</p>

        <button data-toggle="collapse" :data-parent="'#accordion'+tweet.id" :href="'#collapse'+tweet.id"  aria-expanded="false" type="button" class="btn btn-default btn-sm"><i class="fas fa-comment"> {{tweet.comment?tweet.comment.length || 0:0}}</i></button>&nbsp;
        <button v-on:click="toggleTweetLike" class="btn btn-default btn-sm"><i class="fa fa-thumbs-up"> {{tweet.likes?tweet.likes.length || 0:0}}</i></button>
        <!-- {{tweet.likes.indexOf(this.user)}} -->
        <!-- <span class="float-right text-muted">{{tweet.likes.length}} likes- {{tweet.comment.length}} comments</span> -->
      </div>
      <!-- /.card-body -->
      <div :id="'accordion'+tweet.id">
        <div :id="'collapse'+tweet.id" class="panel-collapse in collapse" style="">
          <div class="card-footer card-comments">
            <Comments :tweet="tweet" v-bind:comments="tweet.comment"/>
            <div class="card-footer">
              <form @submit.prevent="addComment">
                <img class="img-fluid img-circle img-sm" src="@/assets/adminlte300-template/dist/img/user4-128x128.jpg" alt="Alt Text">
                <div class="img-push">
                  <input type="text" v-model="commentText" class="form-control form-control-sm" placeholder="Press enter to post comment">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /.card-footer -->

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
    },
    otherUser(){
      return this.$store.getters.getOtherUser;
    },
},
  methods: {
    addComment() {
      const newComment = {
        commentText: this.commentText,
        user:null,
        tweet:{
          id:this.tweet.id
        }
      }
      this.$store.dispatch('post_comment', [this.tweet, newComment]);
      this.commentText = '';
    },
    toggleTweetLike(){
      // console.log(this.tweet.id);
      this.$store.dispatch("toggleTweetLike", this.tweet);
    },
    deleteTweet(){
      this.$store.dispatch("deleteTweet", this.tweet)
    }
  }
}
</script>