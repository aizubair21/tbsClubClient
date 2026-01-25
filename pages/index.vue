<script setup>
const auth = useAuthStore()


if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

</script>

<template>
  <!-- Additional content can go here -->
   <h1 class="pb-2" >
    ড্যাশবোর্ড
   </h1>
   
</template>


