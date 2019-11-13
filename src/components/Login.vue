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

								<form action="../../index3.html" method="post">
									<div class="input-group mb-3">
										<input type="email" class="form-control" placeholder="Email">
										<div class="input-group-append">
											<div class="input-group-text">
												<span class="fas fa-envelope"></span>
											</div>
										</div>
									</div>
									<div class="input-group mb-3">
										<input type="password" class="form-control" placeholder="Password">
										<div class="input-group-append">
											<div class="input-group-text">
												<span class="fas fa-lock"></span>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-8">
											<div class="icheck-primary">
												<input type="checkbox" id="remember">
												<label for="remember">
													Remember Me
												</label>
											</div>
										</div>
										<!-- /.col -->
										<div class="col-4">
											<button type="submit" class="btn btn-primary btn-block">Sign In</button>
										</div>
										<!-- /.col -->
									</div>
								</form>

								<div class="social-auth-links text-center mb-3">
									<p>- OR -</p>
									<a href="#" class="btn btn-block btn-primary">
										<i class="fab fa-facebook mr-2"></i> Sign in using Facebook
									</a>
									<a href="#" class="btn btn-block btn-danger">
										<i class="fab fa-google-plus mr-2"></i> Sign in using Google+
									</a>
								</div>
								<!-- /.social-auth-links -->

								<p class="mb-1">
									<a href="forgot-password.html">I forgot my password</a>
								</p>
								<p class="mb-0">
									<a href="register.html" class="text-center">Register a new membership</a>
								</p>
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
	name : 'Login'
}
</script>

<style>

</style>