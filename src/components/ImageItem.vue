<template>
	<div>
		<div class="col-sm-3">
			<img class="img-fluid pad" :src="image" alt="Photo">
		</div>
	</div>
</template>

<script>
export default {
	name:"ImageItem",
	props:["image"]
}
</script>

<style>

</style>