<script setup>
const auth = useAuthStore()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

const members = ref([])
const editing = ref(null)
const form = reactive({
  code: '',
  name: '',
  approved: false
})

const fetchMembers = async () => {
  members.value = await $fetch('https://tbs-vercel.vercel.app/members')
}

const addMember = async () => {
  await $fetch('https://tbs-vercel.vercel.app/members', {
    method: 'POST',
    body: form
  })
  resetForm()
  await fetchMembers()
}

const editMember = (member) => {
  editing.value = member.id
  Object.assign(form, member)
}

const updateMember = async () => {
  await $fetch(`https://tbs-vercel.vercel.app/members/${editing.value}`, {
    method: 'PUT',
    body: form
  })
  editing.value = null
  resetForm()
  await fetchMembers()
}

const deleteMember = async (id) => {
  await $fetch(`https://tbs-vercel.vercel.app/members/${id}`, {
    method: 'DELETE'
  })
  await fetchMembers()
}

const resetForm = () => {
  form.code = ''
  form.name = ''
  form.approved = false
}

onMounted(fetchMembers)
</script>

<template>
  <div>
    <h1>Members</h1>
    <form @submit.prevent="editing ? updateMember() : addMember()">
      <input v-model="form.code" placeholder="Code" required />
      <input v-model="form.name" placeholder="Name" required />
      <label><input v-model="form.approved" type="checkbox" /> Approved</label>
      <button type="submit">{{ editing ? 'Update' : 'Add' }} Member</button>
      <button v-if="editing" type="button" @click="editing = null; resetForm()">Cancel</button>
    </form>
    <ul>
      <li v-for="member in members" :key="member.id">
        {{ member.name }} ({{ member.code }}) - {{ member.approved ? 'Approved' : 'Pending' }}
        <button @click="editMember(member)">Edit</button>
        <button @click="deleteMember(member.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
form {
  margin-bottom: 20px;
}
input {
  margin-right: 10px;
}
</style>
