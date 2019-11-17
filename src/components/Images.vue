<template>
	<div class="row">
		<ImageItem v-bind:key="image.id" v-for="image in images" v-bind:image="image"/>
	</div>
</template>

<script>
import ImageItem from './ImageItem'
export default {
	name:"Images",
	props:["images"],
	components:{
		ImageItem
	}
}
</script>

<style>

</style>