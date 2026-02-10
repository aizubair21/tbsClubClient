<script setup>
const auth = useAuthStore()
const data = useDataStore()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

const isModalOpen = ref(false)
const openModalFor = ref('')

const deposits = ref([])
const editing = ref(null)
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
  deposits.value = await $fetch('/api/deposits', {
    headers: { Authorization: `Bearer ${auth.token}`, 'x-user-id': auth.userId }
  })
}

const editDeposit = (deposit) => {
  editing.value = deposit.id
  Object.assign(form, deposit)
}

const updateDeposit = async () => {
  await $fetch(`/api/deposits/${editing.value}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${auth.token}`, 'x-user-id': auth.userId },
    body: form
  })
  editing.value = null
  resetForm()
  await fetchDeposits()
}

const deleteDeposit = async (id) => {
  await $fetch(`/api/deposits/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${auth.token}`, 'x-user-id': auth.userId }
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

onMounted(fetchDeposits)
</script>

<template>
  <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> <span v-if="!auth.isAdmin"> আমার </span> আমানত </h1>
    <NuxtLink v-if="auth.isAdmin" to="/deposits/add" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg inline-block">
      যুক্ত করুন
    </NuxtLink>
  </div>

  <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
    <div v-if="deposits.length === 0" class="text-center py-8">
      <p class="text-gray-500">No deposits found.</p>
    </div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full table-auto bordered">
        <thead>
          <tr class="">
            <th @click="isModalOpen = !isModalOpen" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay To</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th v-if="auth.isAdmin" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class=" divide-y divide-gray-200">
          <tr v-for="deposit in deposits" :key="deposit.id">
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ deposit.id }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ deposit.member_code }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ deposit.amount }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ deposit.type }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ deposit.session }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ deposit.month }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ deposit.method }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ deposit.pay_to }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ deposit.date }}</td>
            <td v-if="auth.isAdmin" class="px-4 py-2 whitespace-nowrap text-sm font-medium">
              <button @click="editDeposit(deposit)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
              <button @click="deleteDeposit(deposit.id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>


  <!-- Edit Form Modal -->
  <div v-if="editing" class="fixed inset-1 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" @click="editing = null">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-2xl bg-white" @click.stop>
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Edit Deposit</h3>
        <form @submit.prevent="updateDeposit" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input v-model="form.member_code" placeholder="Member Code" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
            <input v-model.number="form.amount" placeholder="Amount" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
            <input v-model="form.type" placeholder="Type" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
            <input v-model="form.session" placeholder="Session" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
            <input v-model="form.month" placeholder="Month" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
            <input v-model="form.method" placeholder="Method" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
            <input v-model="form.pay_to" placeholder="Pay To" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
            <input v-model="form.send_number" placeholder="Send Number" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
            <input v-model="form.receive_number" placeholder="Receive Number" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
            <input v-model="form.date" type="date" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
            <input v-model="form.trx_id" placeholder="Transaction ID" class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
          </div>
          <div class="flex space-x-4">
            <button type="submit" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
              Update Deposit
            </button>
            <button type="button" @click="editing = null; resetForm()" class="bg-gray-500 text-white rounded-xl py-3 px-6 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>


  <Modal :isOpen="isModalOpen" @close="isModalOpen = false">
    <Input type="search"  />
    <div class="flex items-center justify-between">
      <div>
        0 Selected
      </div>

      <div class="flex items-center space-x-2">
        <button>Select All</button>
        <button class="ml-2">Clear</button>
      </div>
    </div>

    <div class="mt-2">
      <div class="flex items-center justify-start" >
        <input type="checkbox" class="w-8 h-8 mr-3" />
      </div>
    </div>
  </Modal>


</template>
