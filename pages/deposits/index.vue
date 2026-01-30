<script setup>
const auth = useAuthStore()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

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
  deposits.value = await $fetch('https://tbs-vercel.vercel.app/deposits', {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
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

onMounted(fetchDeposits)
</script>

<template>
   <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> আমানত </h1>
    <NuxtLink to="/members/add" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 px-6 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg inline-block">
      যুক্ত করুন
    </NuxtLink>
  </div>
</template>
