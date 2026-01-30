<script setup>
const auth = useAuthStore()

if (!auth.isAuthenticated || !auth.isAdmin) {
  await navigateTo('/login')
}

const users = ref([])
const editing = ref(null)
const form = reactive({
  username: '',
  password: '',
  role: ''
})

const fetchUsers = async () => {
  users.value = await $fetch('/api/members')
}

const addUser = async () => {
  await $fetch('/api/members', {
    method: 'POST',
    body: form
  })
  resetForm()
  await fetchUsers()
}

const editUser = (user) => {
  editing.value = user.id
  Object.assign(form, { ...user, password: '' }) // Don't show password
}

const updateUser = async () => {
  const body = { ...form }
  if (!body.password) delete body.password // Don't update password if empty
  await $fetch(`/api/members/${editing.value}`, {
    method: 'PUT',
    body
  })
  editing.value = null
  resetForm()
  await fetchUsers()
}

const deleteUser = async (id) => {
  await $fetch(`/api/members/${id}`, {
    method: 'DELETE'
  })
  await fetchUsers()
}

const resetForm = () => {
  form.username = ''
  form.password = ''
  form.role = ''
}

onMounted(fetchUsers)
</script>

<template>
  <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
    <h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Users (Admin Only)</h1>
    <form @submit.prevent="editing ? updateUser() : addUser()" class="space-y-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="form.username" placeholder="Username" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.password" type="password" placeholder="Password" :required="!editing" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
      </div>
      <select v-model="form.role" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
        <option value="">Select Role</option>
        <option value="accountant">Accountant</option>
        <option value="admin">Admin</option>
      </select>
      <div class="flex space-x-4">
        <button type="submit" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
          {{ editing ? 'Update' : 'Add' }} User
        </button>
        <button v-if="editing" type="button" @click="editing = null; resetForm()" class="bg-gray-500 text-white rounded-xl py-3 px-6 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
          Cancel
        </button>
      </div>
    </form>
    <ul class="space-y-2">
      <li v-for="user in users" :key="user.id" class="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow">
        <span class="text-gray-800">{{ user.username }} - {{ user.role }}</span>
        <div class="flex space-x-2">
          <button @click="editUser(user)" class="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Edit
          </button>
          <button @click="deleteUser(user.id)" class="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
