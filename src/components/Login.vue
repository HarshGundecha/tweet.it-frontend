<template>
	<div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Legacy User Menu</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Legacy User Menu</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <section class="content">
			<div class="row">
				<div class="offset-md-5 col-md-4">
					<div class="login-box">
						<!-- /.login-logo -->
						<div class="card">
							<div class="card-body login-card-body">
								<p class="login-box-msg">Sign in to start your session</p>

								<form @submit.prevent="login">
									<div class="input-group mb-3">
										<input v-model="email" type="text" class="form-control" placeholder="Email">
										<div class="input-group-append">
											<div class="input-group-text">
												<span class="fas fa-envelope"></span>
											</div>
										</div>
									</div>
									<div class="input-group mb-3">
										<input v-model="password" type="password" class="form-control" placeholder="Password">
										<div class="input-group-append">
											<div class="input-group-text">
												<span class="fas fa-lock"></span>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-6">
											<router-link to="/register" class="btn btn-danger btn-block"> <i class="fa fa-user-plus"></i> Register</router-link>
										</div>
										<!-- /.col -->
										<div class="col-6">
											<button type="submit" class="btn btn-success btn-block">Sign In</button>
										</div>
										<!-- /.col -->
									</div>
								</form>

							</div>
							<!-- /.login-card-body -->
						</div>
					</div>
				</div>
			</div>
    </section>

	</div>

</template>

<script>
export default {
	name : 'Login',
	data(){
		return {
			email : "",
			password : ""
		}
	},
	methods: {
		login: function (){
			let email = this.email 
			let password = this.password
			this.$store.dispatch('login', { email, password })
			.then(() => this.$router.push('/profile'))
		}
  }
}
</script>

<style>

</style>