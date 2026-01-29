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
  <h1 class="pb-4">
    ড্যাশবোর্ড
  </h1>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h2 class="text-sm font-medium text-gray-600"> মোট আমানত </h2>
      <p class="text-2xl font-bold text-gray-900">{{ totalDeposit }}</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h2 class="text-sm font-medium text-gray-600"> সদস্য </h2>
      <p class="text-2xl font-bold text-gray-900">{{ totalMember }}</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h2 class="text-sm font-medium text-gray-600"> ব্যবহারকারী </h2>
      <p class="text-2xl font-bold text-gray-900">{{ totalUser }}</p>
    </div>
  </div>
</template>


