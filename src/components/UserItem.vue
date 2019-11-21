<template>
	<div class="card bg-light">
		<div class="card-header text-muted border-bottom-0">
			Digital Strategist
		</div>
		<div class="card-body pt-0">
			<div class="row">
				<div class="col-7">
					<h2 class="lead"><b>{{user.name}}</b></h2>
					<p class="text-muted text-sm"><b>About: </b> Web Designer / UX / Graphic Artist / Coffee Lover </p>
					<ul class="ml-4 mb-0 fa-ul text-muted">
						<li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Address: Demo Street 123, Demo City 04312, NJ</li>
						<li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Phone #: + 800 - 12 12 23 52</li>
					</ul>
				</div>
				<div class="col-5 text-center">
					<img src="@/assets/adminlte300-template/dist/img/user1-128x128.jpg" alt="" class="img-circle img-fluid">
				</div>
			</div>
		</div>
		<div class="card-footer">
			<div class="text-right">
				<a href="#" class="btn btn-sm bg-teal">
					<i class="fas fa-comments"></i>
				</a>&nbsp;
				<router-link :to="'/profile/'+this.user.username" class="btn btn-sm btn-primary">
					<i class="fas fa-user"></i> View Profile
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:"UserItem",
	props:["user"]
}
</script>

<style>

</style>