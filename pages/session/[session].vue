<script setup>
const auth = useAuthStore();


if(!auth.authencated){
	await redirect('/');
}

</script>


<template>
	
</template>

<style>
	
</style>