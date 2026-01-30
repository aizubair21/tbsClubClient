<script setup>
const auth = useAuthStore()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

const members = ref([])

const fetchMembers = async () => {
  members.value = await $fetch('/api/users')
  console.log(members.value);
  
}

const deleteMember = async (id) => {
  await $fetch(`/api/users/${id}`, {
    method: 'DELETE'
  })
  await fetchMembers()
}

onMounted(fetchMembers)
</script>

<template>
  <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> সদস্যবৃন্দ </h1>
    <NuxtLink to="/members/add" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg inline-block">
      যুক্ত করুন
    </NuxtLink>
  </div>

  <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl rounded-2xl shadow-2xl overflow-hidden">
    <div class="space-y-2">
      <div v-for="member in members" :key="member.id" class="flex items-center justify-between border-b px-4 py-2">
        <div class="flex">
          <span class="pr-3 font-bold">  {{ member.id }} </span>
          <span class="text-gray-800">  {{ member.name }}</span>
        </div>
        <div class="flex space-x-2">
          <NuxtLink :to="`/members/${member.id}`" class="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-all duration-200 shadow-lg">
            <i class="fas fa-edit"></i>
          </NuxtLink>
          <!-- <button @click="deleteMember(member.id)" class="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-105 transition-all duration-200 shadow-lg">
            <i class="fas fa-trash"></i>
          </button> -->
           <NuxtLink  class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-3 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg inline-block">
      <i class="fas fa-angle-right"></i>
    </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
