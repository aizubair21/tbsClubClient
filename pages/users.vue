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
  users.value = await $fetch('http://localhost:3001/users', {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
}

const addUser = async () => {
  await $fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: { Authorization: `Bearer ${auth.token}` },
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
  await $fetch(`http://localhost:3001/users/${editing.value}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${auth.token}` },
    body
  })
  editing.value = null
  resetForm()
  await fetchUsers()
}

const deleteUser = async (id) => {
  await $fetch(`http://localhost:3001/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${auth.token}` }
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
  <div>
    <h1>Users (Admin Only)</h1>
    <form @submit.prevent="editing ? updateUser() : addUser()">
      <input v-model="form.username" placeholder="Username" required />
      <input v-model="form.password" type="password" placeholder="Password" :required="!editing" />
      <select v-model="form.role" required>
        <option value="">Select Role</option>
        <option value="accountant">Accountant</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">{{ editing ? 'Update' : 'Add' }} User</button>
      <button v-if="editing" type="button" @click="editing = null; resetForm()">Cancel</button>
    </form>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.username }} - {{ user.role }}
        <button @click="editUser(user)">Edit</button>
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
form {
  margin-bottom: 20px;
}
input, select {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
