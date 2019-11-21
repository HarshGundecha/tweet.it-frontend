<template>
	<div class="content-wrapper" style="min-height: 1416.81px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Contacts</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Contacts</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="card card-solid">
        <div class="card-body pb-0">
          <div class="row d-flex align-items-stretch">
						<div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch" v-bind:key="user.id" v-for="user in searchUsers">
							<UserItem v-bind:user="user"/>
						</div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <nav aria-label="Contacts Page Navigation">
            <ul class="pagination justify-content-center m-0">
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">4</a></li>
              <li class="page-item"><a class="page-link" href="#">5</a></li>
              <li class="page-item"><a class="page-link" href="#">6</a></li>
              <li class="page-item"><a class="page-link" href="#">7</a></li>
              <li class="page-item"><a class="page-link" href="#">8</a></li>
            </ul>
          </nav>
        </div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->

    </section>
    <!-- /.content -->
  </div>	
</template>

<script>
import UserItem from './UserItem';
export default {
	name:"Search",
	components:{
		UserItem
	},
	props:["searchText"],
	computed:{
		searchUsers(){
			return this.$store.getters.getSearchUsers
    },
  },
  watch: {
    '$route.params.searchText': function (id) {
      this.getSearchResult()
    }
  },
  created: function () {
    this.getSearchResult()
  },
  methods: {
    getSearchResult() {
      this.$store.dispatch('searchUser', this.searchText)
    }
  }
}
</script>

<style>

</style>