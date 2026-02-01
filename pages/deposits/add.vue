<script setup>
const auth = useAuthStore()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

const deposits = ref([])
const editing = ref(null)
const users = ref([])
const form = reactive({
  member_code: '',
  amount: 0,
  type: '',
  session: '',
  month: '',
  method: '',
  pay_to: '',
  send_number: '',
  receive_number: '',
  date: '',
  trx_id: ''
})

const fetchDeposits = async () => {
  deposits.value = await $fetch('https://tbs-vercel.vercel.app/deposits', {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
}

const fetchUsers = async () => {
  users.value = await $fetch('/api/users')
}

const addDeposit = async () => {
  await $fetch('https://tbs-vercel.vercel.app/deposits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${auth.token}` },
    body: { ...form, created_at: new Date().toISOString() }
  })
  resetForm()
  await fetchDeposits()
}

const editDeposit = (deposit) => {
  editing.value = deposit.id
  Object.assign(form, deposit)
}

const updateDeposit = async () => {
  await $fetch(`https://tbs-vercel.vercel.app/deposits/${editing.value}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${auth.token}` },
    body: form
  })
  editing.value = null
  resetForm()
  await fetchDeposits()
}

const deleteDeposit = async (id) => {
  await $fetch(`https://tbs-vercel.vercel.app/deposits/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  await fetchDeposits()
}

const resetForm = () => {
  form.member_code = ''
  form.amount = 0
  form.type = ''
  form.session = ''
  form.month = ''
  form.method = ''
  form.pay_to = ''
  form.send_number = ''
  form.receive_number = ''
  form.date = ''
  form.trx_id = ''
}

onMounted(async () => {
  await fetchDeposits()
  await fetchUsers()
})
</script>

<template>
  <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
    <h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">আমানত যুক্ত করুন</h1>
    <form @submit.prevent="addDeposit()" class="space-y-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <select v-model="form.member_code" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
          <option value="">Select Member</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
             {{ user.id }} - {{ user.name }} - {{ user.phone }}
          </option>
        </select>
        <input v-model.number="form.amount" placeholder="Amount" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <select v-model="form.type" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
          <option value="">Select Type</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="Maintenance">Maintenance</option>
        </select>
        <select v-model="form.session" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
          <option value="">Select Session</option>
          <option value="2024-25">2024-25</option>
          <option value="2025-26">2025-26</option>
          <option value="2026-27">2026-27</option>
          <option value="2027-28">2027-28</option>
          <option value="2028-29">2028-29</option>
          <option value="2029-30">2029-30</option>
        </select>
        <select v-model="form.month" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <input v-model="form.method" placeholder="Method" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.pay_to" placeholder="Pay To" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.send_number" placeholder="Send Number" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.receive_number" placeholder="Receive Number" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.date" type="date" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
        <input v-model="form.trx_id" placeholder="Transaction ID" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
      </div>
      <div class="flex space-x-4">
        <button type="submit" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
          যুক্ত করুন
        </button>
        <NuxtLink to="/deposits" class="bg-gray-500 text-white rounded-xl py-3 px-6 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg inline-block text-center">
          বাতিল করুন
        </NuxtLink>
      </div>
    </form>
  </div>
</template>
