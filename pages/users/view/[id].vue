<script lang="ts" setup>
import { computed } from 'vue'

interface User {
  id: number
  name: string
  username: string
  email: string
  father_name: string
  mother_name: string
  nid: string
  address: string
  role: string
  phone: string
}

interface Deposit {
  id: number
  member_code: number
  amount: number
  type: string
  session: string
  month: string
  method: string
  pay_to: string
  send_number: string
  receive_number: string
  date: string
  trx_id: string
}

const auth = useAuthStore()
const dt = useDataStore()
const route = useRoute()
const id = parseInt(route.params.id as string)

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}
const now = new Date();
const user = ref<User>({} as User)
const deposits = ref<Deposit[]>([])
const sessionFilter = ref('')
const monthFilter = ref('')

const fetchUser = async () => {
  user.value = await $fetch<User>(`/api/users/${id}`)
}

const fetchDeposits = async () => {
  const allDeposits = await $fetch<Deposit[]>('/api/deposits', {
    headers: { Authorization: `Bearer ${auth.token}`, 'x-user-id': auth.userId || '' }
  })
  deposits.value = allDeposits.filter(d => d.member_code == id)
}

const filteredDeposits = computed(() => {
  let filtered = deposits.value
  if (sessionFilter.value) {
    filtered = filtered.filter(d => d.session === sessionFilter.value)
  }
  if (monthFilter.value) {
    filtered = filtered.filter(d => d.month === monthFilter.value)
  }
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalDeposit = computed(() => deposits.value.reduce((sum, d) => sum + d.amount, 0))
const totalMonths = computed(() => new Set(deposits.value.map(d => d.month)).size)
const yearlyDeposits = computed(() => deposits.value.filter(d => d.type === 'yearly').reduce((sum, d) => sum + d.amount, 0))
const monthlyDeposits = computed(() => deposits.value.filter(d => d.type === 'monthly').reduce((sum, d) => sum + d.amount, 0))
const maintenanceDeposits = computed(() => deposits.value.filter(d => d.type === 'maintenance').reduce((sum, d) => sum + d.amount, 0))

onMounted(() => {
  fetchUser()
  fetchDeposits()
})
</script>

<template>
  
  <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
    <h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">User Details</h1>
    <table class=" w-full bordered mb-6">
      <tbody>
        <tr>
          <td class="px-4 py-2 font-medium">ID</td>
          <td class="px-4 py-2">: {{ user.id }}</td>
        </tr>
        <tr>
          <td class="px-4 py-2 font-medium">Name</td>
          <td class="px-4 py-2">: {{ user.name }}</td>
        </tr>
        <tr>
          <td class="px-4 py-2 font-medium">Username</td>
          <td class="px-4 py-2">: {{ user.username }}</td>
        </tr>
        <tr>
          <td class="px-4 py-2 font-medium">Email</td>
          <td class="px-4 py-2">: {{ user.email }}</td>
        </tr>
        <tr v-if="auth.isAdmin">
          <td class="px-4 py-2 font-medium">Phone</td>
          <td class="px-4 py-2">: {{ user.phone }}</td>
        </tr>
        
      </tbody>
    </table>

    <hr class="my-4" />

    <!-- Deposit Overview -->
   <!-- <h2 class="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Deposit Overview</h2> -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-4 shadow-lg">
        <h3 class="text-md font-semibold">Total Deposit</h3>
        <p class="text-2xl font-bold">{{ totalDeposit }}</p>
      </div>
      <div class="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-4 shadow-lg">
        <h3 class="text-md font-semibold">Total Months</h3>
        <p class="text-2xl font-bold">{{ totalMonths }}</p>
      </div>
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 shadow-lg">
        <h3 class="text-md font-semibold">Yearly Deposits</h3>
        <p class="text-2xl font-bold">{{ yearlyDeposits }}</p>
      </div>
      <div class="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl p-4 shadow-lg">
        <h3 class="text-md font-semibold">Monthly Deposits</h3>
        <p class="text-2xl font-bold">{{ monthlyDeposits }}</p>
      </div>
      <div class="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl p-4 shadow-lg">
        <h3 class="text-md font-semibold">Maintenance Deposits</h3>
        <p class="text-2xl font-bold">{{ maintenanceDeposits }}</p>
      </div>
    </div>


  </div>

  <div class="mt-6 bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
    <!-- Deposit Lists -->
    <div class="flex items-center justify-between my-4">
      <h2 class="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Deposits</h2>
    
      <div v-if="auth.isAdmin" class="">
        <NuxtLink to="/deposits/add" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg inline-block">
          Add
        </NuxtLink>
      </div>
    </div>
    
    <!-- filter  -->
    <div class="mb-4 flex space-x-4">
      <!-- <input v-model="sessionFilter" placeholder="Filter by Session" class="border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" /> -->
       <select v-model="sessionFilter" required class="border-2 border-gray-300 rounded-xl px-3 py-1 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
          <option value="">Select Session</option>
          <option v-for="session in dt.sessionArray" :value="session">{{session}}</option>
         
        </select>
      <!-- <input v-model="monthFilter" placeholder="Filter by Month" class="border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" /> -->
      <select v-model="monthFilter" required class="border-2 border-gray-300 rounded-xl px-3 py-1 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
          <option value="">Select Month</option>
          <option v-for="mn in dt.monthArray" :value="mn"> {{mn}} </option>
        </select>
    </div>

    <div class="">
      <div v-if="filteredDeposits.length === 0" class="text-center py-8">
        <p class="text-gray-500">No deposits found.</p>
      </div>
      <div v-else class="overflow-x-scroll ">
        <table class="w-full table-auto bordered">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Infot</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th>

              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(deposit, index) in filteredDeposits" :key="deposit.id" class="bg-white px-2 border-b">
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{index}}</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{deposit.month}} {{ deposit.session }}, {{deposit.type}}  </td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ deposit.amount }}</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900"> <span class="px-2 rounded-xl shadow-xl bg-gray-300 "><i class="fas fa-angle-right"></i></span> </td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
    
</style>
