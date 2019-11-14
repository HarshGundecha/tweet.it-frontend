<template>
	<div class="content-wrapper ">
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
					<div class="register-box">
						<div class="card">
							<div class="card-body register-card-body">
								<p class="login-box-msg">Register a new membership</p>

								<form @submit.prevent="register">
									<div class="input-group mb-3">
										<input v-model="username" type="text" class="form-control" placeholder="Username">
										<div class="input-group-append">
											<div class="input-group-text">
												<span class="fas fa-user"></span>
											</div>
										</div>
									</div>
									<div class="input-group mb-3">
										<input v-model="name" type="text" class="form-control" placeholder="Name">
										<div class="input-group-append">
											<div class="input-group-text">
												<span class="fas fa-user"></span>
											</div>
										</div>
									</div>
									<div class="input-group mb-3">
										<input v-model="email" type="email" class="form-control" placeholder="Email">
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
										<div class="col-8">
											<div class="icheck-primary">
												<input type="checkbox" id="agreeTerms" name="terms" value="agree">
												<label for="agreeTerms">
												I agree to the <a href="#">terms</a>
												</label>
											</div>
										</div>
										<!-- /.col -->
										<div class="col-4">
											<button type="submit" class="btn btn-primary btn-block">Register</button>
										</div>
										<!-- /.col -->
									</div>
								</form>

								<div class="social-auth-links text-center">
									<p>- OR -</p>
									<a href="#" class="btn btn-block btn-primary">
										<i class="fab fa-facebook mr-2"></i>
										Sign up using Facebook
									</a>
									<a href="#" class="btn btn-block btn-danger">
										<i class="fab fa-google-plus mr-2"></i>
										Sign up using Google+
									</a>
								</div>

								<a href="login.html" class="text-center">I already have a membership</a>
							</div>
							<!-- /.form-box -->
						</div><!-- /.card -->
					</div>
				</div>
			</div>
    </section>
	</div>
</template>

<script>
export default {
	name : 'Register',
	data(){
		return {
			name : "",
			username : "",
			email : "",
			password : "",
		}
	},
	methods: {
		register: function () {
			let data = {
				name: this.name,
				username: this.username,
				email: this.email,
				password: this.password,
			}
			this.$store.dispatch('register', data)
			.then(() => this.$router.push('/'))
			.catch(err => console.log(err))
		}
	}
}
</script>

<style>

</style>