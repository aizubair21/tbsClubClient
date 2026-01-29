<script setup>
const auth = useAuthStore()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

const members = ref([])
const editing = ref(null)
const showForm = ref(false)
const form = reactive({
  code: '',
  name: '',
  approved: false
})

const fetchMembers = async () => {
  const { data } = await useLazyFetch('/api/members', 
    {
      method: 'GET',
    }
  )
  members.value = data.value || []
}

const addMember = async () => {
  await $fetch('/api/members', {
    method: 'POST',
    body: form
  })
  showForm.value = false
  resetForm()
  await fetchMembers()
}

const editMember = (member) => {
  editing.value = member.id
  showForm.value = true
  Object.assign(form, member)
}

const updateMember = async () => {
  await $fetch(`/api/members/${editing.value}`, {
    method: 'PUT',
    body: form
  })
  editing.value = null
  showForm.value = false
  resetForm()
  await fetchMembers()
}

const deleteMember = async (id) => {
  await $fetch(`/api/members/${id}`, {
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
  <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
    <h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Members</h1>
    <button v-if="!showForm" @click="showForm = true" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg mb-6">
      Add Member
    </button>    
    <form v-if="showForm" @submit.prevent="editing ? updateMember() : addMember()" class="space-y-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="form.code" placeholder="Code" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.name" placeholder="Name" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
      </div>
      <label class="flex items-center space-x-2">
        <input v-model="form.approved" type="checkbox" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
        <span class="text-gray-700">Approved</span>
      </label>
      <div class="flex space-x-4">
        <button type="submit" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
          {{ editing ? 'Update' : 'Add' }} Member
        </button>
        <button v-if="editing" type="button" @click="editing = null; resetForm()" class="bg-gray-500 text-white rounded-xl py-3 px-6 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
          Cancel
        </button>
      </div>
    </form>
    <ul class="space-y-2">
      <li v-for="member in members" :key="member.id" class="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow">
        <span class="text-gray-800">{{ member.name }} ({{ member.code }}) - {{ member.approved ? 'Approved' : 'Pending' }}</span>
        <div class="flex space-x-2">
          <button @click="editMember(member)" class="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Edit
          </button>
          <button @click="deleteMember(member.id)" class="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
