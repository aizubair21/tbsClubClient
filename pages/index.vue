<script setup>
const auth = useAuthStore()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

const { data: deposits } = await useAsyncData('deposits', () => $fetch('/api/deposits'))
const { data: members } = await useAsyncData('members', () => $fetch('/api/members'))
const { data: users } = await useAsyncData('users', () => $fetch('/api/users'))

const totalDeposit = computed(() => deposits.value?.reduce((sum, d) => sum + d.amount, 0) || 0)
const totalMember = computed(() => members.value?.length || 0)
const totalUser = computed(() => users.value?.length || 0)
</script>

<template>
   <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> ড্যাশবোর্ড </h1>
  </div>
  <h1 class="pb-4 text-white">
    ওভারভিউ
  </h1>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class=" bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <h2 class="text-sm font-medium text-gray-600"> মোট আমানত </h2>
      <p class="text-2xl font-bold text-gray-900">{{ totalDeposit }} ৳</p>
    </div>
    <div class=" bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <h2 class="text-sm font-medium text-gray-600"> পরিচালক </h2>
      <p class="text-2xl font-bold text-gray-900">{{ totalMember }} জন</p>
    </div>
    <div class=" bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <h2 class="text-sm font-medium text-gray-600"> ব্যবহারকারী </h2>
      <p class="text-2xl font-bold text-gray-900">{{ totalUser }} জন</p>
    </div>
  </div>

  <!-- bellow section only for user role  -->
  <div v-if="auth.isAdmin">

    <hr class="my-5" />
    <h1 class="pb-4 text-white">
      সর্বশেষ আমানত
    </h1>
  
    <hr class="my-5" />
    <h1 class="pb-4 text-white">
      সর্বশেষ ব্যবহারকারী
    </h1>
  </div>

  <div class="mt-5" v-else>
   <div class=" bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <h2 class="text-sm font-medium text-gray-600"> আমার আমানত </h2>
      <p class="text-2xl font-bold text-gray-900"> ০০০০ ৳</p>
    </div>
  </div>

</template>


