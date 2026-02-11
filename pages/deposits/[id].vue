<script setup>
const auth = useAuthStore()
const data = useDataStore()
const route = useRoute()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

const depositId = route.params.id
const deposit = ref(null)
const deposits = ref([])
const isLoading = ref(true)
const error = ref('')
const isEditModalOpen = ref(false)
const isDeleteConfirmOpen = ref(false)
const usersArray = ref([])

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
  try {
    deposits.value = await $fetch('/api/deposits')
    deposit.value = deposits.value.find(d => d.id == depositId)
    if (!deposit.value) {
      error.value = 'Deposit not found.'
      return
    }
    // Permission check
    if (!auth.isAdmin && auth.userId != deposit.value.member_code) {
      await navigateTo('/deposits')
      return
    }
  } catch (err) {
    error.value = 'Failed to load deposit.'
  } finally {
    isLoading.value = false
  }
}

const openEditModal = () => {
  Object.assign(form, deposit.value)
  isEditModalOpen.value = true
}

const updateDeposit = async () => {
  try {
    await $fetch(`/api/deposits/${depositId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${auth.token}`, 'x-user-id': auth.userId },
      body: form
    })
    await fetchDeposits()
    isEditModalOpen.value = false
  } catch (err) {
    error.value = 'Failed to update deposit.'
  }
}

const confirmDelete = () => {
  isDeleteConfirmOpen.value = true
}

const deleteDeposit = async () => {
  try {
    await $fetch(`/api/deposits/${depositId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${auth.token}`, 'x-user-id': auth.userId }
    })
    await navigateTo('/deposits')
  } catch (err) {
    error.value = 'Failed to delete deposit.'
  }
}

const fetchUser = async () => {
  let u = await $fetch('/api/users');
  await u.forEach( item => usersArray.value[item.id] = item.name)
  console.log(usersArray);
}

onMounted(() => {
  fetchDeposits(),
  fetchUser()
})
</script>

<template>
  <div class="">

    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 text-lg">{{ error }}</p>
    </div>
    
    <div v-else-if="deposit" class=" mx-auto">
      <!-- Header -->
      <div class="bg-opacity-90 backdrop-blur-md rounded-2xl my-6 flex items-center justify-between">
        <h1 class="text-3xl font-bold ">
          Deposit Details
        </h1>
      </div>

      <!-- Deposit Card -->
      <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="space-y-4">
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">ID</label>
              <p class="text-lg font-semibold text-gray-900"> {{ deposit.id }}</p>
            </div>
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">Member</label>
              <p class="text-lg font-semibold text-gray-900"> {{ deposit.member_code }} - {{ usersArray[deposit.member_code] }}</p>
            </div>
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">Amount</label>
              <p class="text-lg font-semibold text-gray-900">{{ deposit.amount }}</p>
            </div>
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">Type</label>
              <p class="text-lg font-semibold text-gray-900">{{ deposit.type }}</p>
            </div>
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">Session</label>
              <p class="text-lg font-semibold text-gray-900">{{ deposit.session }}</p>
            </div>
          </div>
          <div class="space-y-4">
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">Month</label>
              <p class="text-lg font-semibold text-gray-900">{{ deposit.month }}</p>
            </div>
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">Method</label>
              <p class="text-lg font-semibold text-gray-900">{{ deposit.method }}</p>
            </div>
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">Pay To</label>
              <p class="text-lg font-semibold text-gray-900">{{ deposit.pay_to }}</p>
            </div>
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">Date</label>
              <p class="text-lg font-semibold text-gray-900">{{ deposit.date }}</p>
            </div>
          </div>
          <div class="space-y-4">
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">Send Number</label>
              <p class="text-lg font-semibold text-gray-900">{{ deposit.send_number || 'N/A' }}</p>
            </div>
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">Receive Number</label>
              <p class="text-lg font-semibold text-gray-900">{{ deposit.receive_number || 'N/A' }}</p>
            </div>
            <div class="border-b">
              <label class="block text-sm font-medium text-gray-700">Transaction ID</label>
              <p class="text-lg font-semibold text-gray-900">{{ deposit.trx_id || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <!-- Admin Actions -->
        <div v-if="auth.isAdmin" class="mt-8 flex space-x-4">
          <button @click="openEditModal" class="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl py-3 px-6 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
            Edit
          </button>
          <button @click="confirmDelete" class="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <Modal :isOpen="isEditModalOpen" @close="isEditModalOpen = false">
    <div class="max-h-96 overflow-y-auto">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Edit Deposit</h3>
      <form @submit.prevent="updateDeposit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input v-model="form.member_code" placeholder="Member Code" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
          <input v-model.number="form.amount" placeholder="Amount" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200" />
          <select v-model="form.type" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
            <option value="">Select Type</option>
            <option v-for="type in data.typeArray" :key="type" :value="type">{{ type }}</option>
          </select>
          <select v-model="form.session" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
            <option value="">Select Session</option>
            <option v-for="session in data.sessionArray" :key="session" :value="session">{{ session }}</option>
          </select>
          <select v-model="form.month" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
            <option value="">Select Month</option>
            <option v-for="month in data.monthArray" :key="month" :value="month">{{ month }}</option>
          </select>
          <select v-model="form.method" required class="border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
            <option value="">Select Method</option>
            <option v-for="method in data.methodArray" :key="method" :value="method">{{ method }}</option>
          </select>
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
          <button type="button" @click="isEditModalOpen = false" class="bg-gray-500 text-white rounded-xl py-3 px-6 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </Modal>

  <!-- Delete Confirmation Modal -->
  <Modal :isOpen="isDeleteConfirmOpen" @close="isDeleteConfirmOpen = false">
    <div class="text-center">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
      <p class="text-gray-600 mb-6">Are you sure you want to delete this deposit? This action cannot be undone.</p>
      <div class="flex space-x-4 justify-center">
        <button @click="deleteDeposit" class="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
          Delete
        </button>
        <button @click="isDeleteConfirmOpen = false" class="bg-gray-500 text-white rounded-xl py-3 px-6 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
          Cancel
        </button>
      </div>
    </div>
  </Modal>
</template>

<style lang="postcss" scoped>
/* Additional styles if needed */
</style>
