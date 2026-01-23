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
  <div>
    <h1>Deposits</h1>
    <form @submit.prevent="editing ? updateDeposit() : addDeposit()">
      <input v-model="form.member_code" placeholder="Member Code" required />
      <input v-model.number="form.amount" placeholder="Amount" required />
      <input v-model="form.type" placeholder="Type" required />
      <input v-model="form.session" placeholder="Session" required />
      <input v-model="form.month" placeholder="Month" required />
      <input v-model="form.method" placeholder="Method" required />
      <input v-model="form.pay_to" placeholder="Pay To" required />
      <input v-model="form.send_number" placeholder="Send Number" />
      <input v-model="form.receive_number" placeholder="Receive Number" />
      <input v-model="form.date" type="date" required />
      <input v-model="form.trx_id" placeholder="Transaction ID" />
      <button type="submit">{{ editing ? 'Update' : 'Add' }} Deposit</button>
      <button v-if="editing" type="button" @click="editing = null; resetForm()">Cancel</button>
    </form>
    <ul>
      <li v-for="deposit in deposits" :key="deposit.id">
        {{ deposit.member_code }} - {{ deposit.amount }} ({{ deposit.type }}) - {{ deposit.date }}
        <button @click="editDeposit(deposit)">Edit</button>
        <button @click="deleteDeposit(deposit.id)">Delete</button>
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
  margin-bottom: 5px;
}
</style>
