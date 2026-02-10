<script setup>
import Input from '~/components/Input.vue'

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

const keyToField = {
  Member: 'member_code',
  Type: 'type',
  Session: 'session',
  Month: 'month',
  Method: 'method'
}

const filters = reactive({
  Member: { selected: [], search: '', options: [] },
  Session: { selected: [], search: '', options: [] },
  Month: { selected: [], search: '', options: [] },
  Type: { selected: [], search: '', options: [] },
  Method: { selected: [], search: '', options: [] }
})



const filteredDeposits = computed(() => {
  return deposits.value.filter(deposit => {
    return Object.keys(filters).every(key => {
      const field = keyToField[key] || key.toLowerCase()
      return filters[key].selected.includes(deposit[field])
    })
  })
})

const filteredOptions = computed(() => {
  const result = {}
  Object.keys(filters).forEach(key => {
    result[key] = filters[key].options.filter(option =>
      option.toLowerCase().includes(filters[key].search.toLowerCase())
    )
  })
  return result
})

const toggleSelection = (key, value) => {
  const index = filters[key].selected.indexOf(value)
  if (index > -1) {
    filters[key].selected.splice(index, 1)
  } else {
    filters[key].selected.push(value)
  }
}

const selectAll = (key) => {
  filters[key].selected = [...filters[key].options]
}

const clearAll = (key) => {
  filters[key].selected = []
}

const fetchDeposits = async () => {
  deposits.value = await $fetch('/api/deposits', {
    headers: { Authorization: `Bearer ${auth.token}`, 'x-user-id': auth.userId }
  })

  // Populate filter options and select all by default
  Object.keys(filters).forEach(key => {
    const field = keyToField[key] || key.toLowerCase()
    const uniqueValues = [...new Set(deposits.value.map(d => d[field]).filter(v => v !== null && v !== undefined && v !== ''))]
    filters[key].options = uniqueValues
    filters[key].selected = [...uniqueValues]
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

const openModal = (key) => {
  openModalFor.value = key.target.textContent;
  // console.log(filters[openModalFor.value]);
  isModalOpen.value = !isModalOpen.value;
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
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th @click="openModal" class="cursor-pointer px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th @click="openModal" class="cursor-pointer px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th @click="openModal" class="cursor-pointer px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
            <th @click="openModal" class="cursor-pointer px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
            <th @click="openModal" class="cursor-pointer px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay To</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th v-if="auth.isAdmin" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class=" divide-y divide-gray-200">
          <tr v-for="deposit in filteredDeposits" :key="deposit.id">
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
    <div class="max-h-96 overflow-y-auto">
      <div v-if="openModalFor" :key="openModalFor">
        <h4 class="text-lg font-semibold mb-2 capitalize"> {{ openModalFor }} </h4>
        <Input v-model="filters[openModalFor].search" placeholder="Search..." class="mb-2" />
        <div class="flex items-center justify-between mb-2">
          <div>{{ filters[openModalFor].selected.length }} Selected</div>
          <div class="flex items-center space-x-2">
            <button @click="selectAll(openModalFor)" class="text-blue-600 hover:text-blue-800">Select All</button>
            <button @click="clearAll(openModalFor)" class="text-red-600 hover:text-red-800">Clear</button>
          </div>
        </div>
        <div class="space-y-1 max-h-40 overflow-y-auto">
          <div v-for="option in filteredOptions[openModalFor]" :key="option" class="flex items-center">
            <input
              :id="`${openModalFor}-${option}`"
              type="checkbox"
              :checked="filters[openModalFor].selected.includes(option)"
              @change="toggleSelection(openModalFor, option)"
              class="w-5 h-5 mr-2"
            />
            <label :for="`${openModalFor}-${option}`" class="text-sm">{{ option }}</label>
          </div>
        </div>
      </div>
    </div>
  </Modal>

</template>
