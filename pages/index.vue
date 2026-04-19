<script setup>
const auth = useAuthStore()
auth.isLoading = true;

if (!auth.isAuthenticated && !auth.isAdmin) {
  await navigateTo('/users')
}

// Index mapping based on Google Sheets data structure
const INDEX = {
  user_id: 0,
  session: 1,
  amount: 2,
  type: 3,
  month: 4,
  method: 5,
  pay_to: 6,
  send_from: 7,
  date: 10
}

const deposits = ref([]);
const users = ref([]);
const members = ref([]);

const getData = async () => {
  try {
    users.value = await $fetch('/api/sheets/users')
    deposits.value = await $fetch('/api/sheets/deposits');
    console.log('Deposits data:', deposits.value);
    console.log('Users data:', users.value);
    auth.isLoading = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    auth.isLoading = false;
  }
}

// Helper function to safely get amount from indexed array
const getAmount = (deposit) => {
  return parseFloat(deposit[INDEX.amount]) || 0
}

// Helper function to get type from indexed array
const getType = (deposit) => {
  return deposit[INDEX.type] || ''
}

// Helper function to get month from indexed array
const getMonth = (deposit) => {
  return deposit[INDEX.month] || ''
}

// Helper function to get session from indexed array
const getSession = (deposit) => {
  return deposit[INDEX.session] || ''
}

// Computed properties with proper indexed access
const totalDeposit = computed(() => {
  return deposits.value?.reduce((sum, d) => sum + getAmount(d), 0) || 0
})

const totalMember = computed(() => {
  // Filter users where role is 'member' or 'admin' based on your user structure
  return users.value?.filter(u => u[3] !== 'user')?.length || 0
})

const totalUser = computed(() => {
  // Filter users where role is 'user'
  return users.value?.filter(u => u[3] === 'user')?.length || 0
})

const lastFiveDeposit = computed(() => {
  return deposits.value?.slice(-5).reverse() || []
})

const lastFiveMembers = computed(() => {
  // Get last 5 users (adjust based on your user structure)
  return users.value?.slice(-5).reverse() || []
})

const monthlyDeposit = computed(() => {
  return deposits.value?.filter(d => getType(d) === 'Monthly')
    .reduce((sum, d) => sum + getAmount(d), 0) || 0
})

const yearlyDeposit = computed(() => {
  return deposits.value?.filter(d => getType(d) === 'Yearly')
    .reduce((sum, d) => sum + getAmount(d), 0) || 0
})

const costDeposit = computed(() => {
  return deposits.value?.filter(d => getType(d) === 'Cost')
    .reduce((sum, d) => sum + getAmount(d), 0) || 0
})

const currentMonthDeposit = computed(() => {
  return deposits.value?.filter(d => getMonth(d) === auth.currentMonth && getSession(d) === auth.currentSession)
    .reduce((sum, d) => sum + getAmount(d), 0) || 0
})

const currentSessionDeposit = computed(() => {
  return deposits.value?.filter(d => getSession(d) === auth.currentSession)
    .reduce((sum, d) => sum + getAmount(d), 0) || 0
})

// Get user-specific deposits for non-admin users
const userDeposits = computed(() => {
  if (!auth.isAdmin && auth.userId) {
    return deposits.value?.filter(d => d[INDEX.user_id] === auth.userId) || []
  }
  return []
})

const userTotalDeposit = computed(() => {
  return userDeposits.value.reduce((sum, d) => sum + getAmount(d), 0) || 0
})

onMounted(() => {
  getData()
})
</script>

<template>
  <div v-if="deposits.length > 0" class="space-y-6">
    <!-- Header -->
    <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        ড্যাশবোর্ড
      </h1>
      <p class="text-sm text-gray-500 mt-1">Connected to Google Sheets</p>
    </div>

    <!-- Overview Section -->
    <div>
      <h2 class="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-300">ওভারভিউ</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h3 class="text-sm font-medium text-gray-600 mb-2">মোট আমানত</h3>
          <p class="text-2xl font-bold text-green-600">{{ totalDeposit.toLocaleString() }} ৳</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h3 class="text-sm font-medium text-gray-600 mb-2">পরিচালক</h3>
          <p class="text-2xl font-bold text-purple-600">{{ totalMember }} জন</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h3 class="text-sm font-medium text-gray-600 mb-2">ব্যবহারকারী</h3>
          <p class="text-2xl font-bold text-blue-600">{{ totalUser }} জন</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h3 class="text-sm font-medium text-gray-600 mb-2">মাসিক আমানত</h3>
          <p class="text-2xl font-bold text-teal-600">{{ monthlyDeposit.toLocaleString() }} ৳</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h3 class="text-sm font-medium text-gray-600 mb-2">বার্ষিক আমানত</h3>
          <p class="text-2xl font-bold text-indigo-600">{{ yearlyDeposit.toLocaleString() }} ৳</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h3 class="text-sm font-medium text-gray-600 mb-2">খরচ</h3>
          <p class="text-2xl font-bold text-red-600">{{ costDeposit.toLocaleString() }} ৳</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h3 class="text-sm font-medium text-gray-600 mb-2">চলতি মাসের আমানত</h3>
          <p class="text-2xl font-bold text-orange-600">{{ currentMonthDeposit.toLocaleString() }} ৳</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h3 class="text-sm font-medium text-gray-600 mb-2">চলতি সেশনের আমানত</h3>
          <p class="text-2xl font-bold text-cyan-600">{{ currentSessionDeposit.toLocaleString() }} ৳</p>
        </div>
      </div>
    </div>

    <!-- Admin Section -->
    <div v-if="auth.isAdmin">
      <!-- Recent Deposits -->
      <div>
        <h2 class="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-300">সর্বশেষ আমানত</h2>
        
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ব্যবহারকারী আইডি</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">বিবরণ</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">পরিমাণ</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">তারিখ</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(deposit, index) in lastFiveDeposit" :key="index" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ deposit[INDEX.user_id] }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span class="capitalize">{{ deposit[INDEX.month] }}</span> 
                    <span>{{ deposit[INDEX.session] }}</span>
                    <span :class="{
                      'text-green-600': deposit[INDEX.type] === 'Monthly',
                      'text-blue-600': deposit[INDEX.type] === 'Yearly',
                      'text-red-600': deposit[INDEX.type] === 'Cost'
                    }">
                      ({{ deposit[INDEX.type] }})
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ৳{{ getAmount(deposit).toLocaleString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ deposit[INDEX.date] || '-' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <NuxtLink :to="`/deposits/${deposit[INDEX.user_id]}`" 
                              class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <i class="fas fa-angle-right mr-1"></i> বিস্তারিত
                    </NuxtLink>
                  </td>
                </tr>
                <tr v-if="lastFiveDeposit.length === 0">
                  <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                    কোনো আমানতের তথ্য পাওয়া যায়নি
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Recent Members -->
      <div>
        <h2 class="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-300">সর্বশেষ নিবন্ধিত সদস্য</h2>
        
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div class="divide-y divide-gray-200">
            <div v-for="(member, index) in lastFiveMembers" :key="index" 
                 class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-4">
                <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {{ index + 1 }}
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ member[1] || 'নাম নেই' }}</p>
                  <p class="text-sm text-gray-500">আইডি: {{ member[16] }}</p>
                </div>
              </div>
              <div class="flex space-x-2">
                <NuxtLink v-if="auth.isAdmin" :to="`/users/${member[16]}`" 
                          class="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors shadow-md">
                  <i class="fas fa-edit"></i>
                </NuxtLink>
                <NuxtLink :to="`/users/view/${member[16]}`" 
                          class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-2 hover:from-purple-600 hover:to-pink-600 transition-colors shadow-md">
                  <i class="fas fa-angle-right"></i>
                </NuxtLink>
              </div>
            </div>
            <div v-if="lastFiveMembers.length === 0" class="p-8 text-center text-gray-500">
              কোনো সদস্যের তথ্য পাওয়া যায়নি
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User Section (Non-Admin) -->
    <div v-else class="mt-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 shadow-2xl text-white">
          <h3 class="text-lg font-semibold mb-2">আমার মোট আমানত</h3>
          <p class="text-3xl font-bold">{{ userTotalDeposit.toLocaleString() }} ৳</p>
          <p class="text-sm opacity-90 mt-2">মোট {{ userDeposits.length }} টি লেনদেন</p>
        </div>
        
        <div class="bg-white rounded-2xl p-6 shadow-2xl">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">সর্বশেষ লেনদেন</h3>
          <div class="space-y-3">
            <div v-for="(deposit, index) in userDeposits.slice(-3).reverse()" :key="index" 
                 class="flex justify-between items-center border-b pb-2">
              <div>
                <p class="text-sm text-gray-600">{{ deposit[INDEX.month] }} {{ deposit[INDEX.session] }}</p>
                <p class="text-xs text-gray-400">{{ deposit[INDEX.type] }}</p>
              </div>
              <p class="font-semibold text-green-600">৳{{ getAmount(deposit).toLocaleString() }}</p>
            </div>
            <div v-if="userDeposits.length === 0" class="text-center text-gray-500 py-4">
              কোনো লেনদেন নেই
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else-if="auth.isLoading" class="flex justify-center items-center h-96">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
      <p class="mt-4 text-gray-500">লোড হচ্ছে...</p>
    </div>
  </div>

  <!-- Empty State -->
  <div v-else class="bg-white rounded-2xl p-12 shadow-2xl text-center">
    <i class="fas fa-database text-6xl text-gray-300 mb-4"></i>
    <p class="text-gray-500 text-lg">কোনো তথ্য পাওয়া যায়নি</p>
    <p class="text-gray-400 text-sm mt-2">দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন</p>
  </div>
</template>