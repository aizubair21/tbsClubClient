<script setup>
const auth = useAuthStore()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

const route = useRoute()
const id = parseInt(route.params.id)

const form = reactive({
  username: '',
  name: '',
  email: '',
  father_name: '',
  mother_name: '',
  nid: '',
  address: '',
  role: '',
  phone: ''
})

const fetchMember = async () => {
  const member = await $fetch(`/api/users/${id}`)
  Object.assign(form, member)
}

const updateMember = async () => {
  await $fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: form
  })
  await navigateTo('/users')
}

onMounted(fetchMember)
</script>

<template>
  <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
    <h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Edit User</h1>
    <form @submit.prevent="updateMember()" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="form.username" placeholder="Username" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.name" placeholder="Name" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.email" placeholder="Email" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.father_name" placeholder="Father Name" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.mother_name" placeholder="Mother Name" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.nid" placeholder="NID" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.address" placeholder="Address" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.role" placeholder="Role" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.phone" placeholder="Phone" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
      </div>
      <div class="flex space-x-4">
        <button type="submit" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
          Update User
        </button>
        <NuxtLink to="/users" class="bg-gray-500 text-white rounded-xl py-3 px-6 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
          Cancel
        </NuxtLink>
      </div>
    </form>
  </div>
</template>
