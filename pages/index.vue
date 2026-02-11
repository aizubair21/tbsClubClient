<script setup>
const auth = useAuthStore()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

const deposits = ref([]);
const users = ref([]);
const members = ref([]);

const getData = async () => {
  
  deposits.value = await $fetch('/api/deposits')
  members.value = await $fetch('/api/members')
  users.value = await $fetch('/api/users')
  
  console.log(deposits.value);
  
}
// const { data: deposits } = await useAsyncData('deposits', () => $fetch('/api/deposits'))

const totalDeposit = computed(() => deposits.value?.reduce((sum, d) => sum + d.amount, 0) || 0)
const totalMember = computed(() => members.value?.length || 0)
const totalUser = computed(() => users.value?.length || 0)
const lastFiveDeposit = computed(() => deposits.value.slice(deposits.value.length > 5 ? deposits.value.length - 5 : 0, deposits.value.length > 5 ? deposits.value.length : 1) );
const lastFiveMembers = computed(() => users.value.slice(users.value.length > 5 ? users.value.length - 5 : 0, users.value.length > 5 ? users.value.length : 1) );

onMounted(()=>{
  getData()
})
</script>

<template>
   <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-2xl flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> ড্যাশবোর্ড </h1>
  </div>
  <h1 class="pb-4 text-white">
    ওভারভিউ
  </h1>

  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class=" bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <h2 class="text-sm font-medium text-gray-600"> মোট আমানত </h2>
      <p class="text-2xl font-bold text-gray-900">{{ totalDeposit }} ৳</p>
    </div>
    <div class=" bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <h2 class="text-sm font-medium text-gray-600"> পরিচালক </h2>
      <p class="text-2xl font-bold text-gray-900">{{ totalMember }} জন</p>
    </div>
    <div class=" bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <h2 class="text-sm font-medium text-gray-600"> ব্যবহারকারী </h2>
      <p class="text-2xl font-bold text-gray-900">{{ totalUser }} জন</p>
    </div>
  </div>

  <!-- bellow section only for user role  -->
  <div v-if="auth.isAdmin">

    <hr class="my-5" />
    <div>

      <h1 class="pb-4 text-white">
        সর্বশেষ প্রদেয় আমানত
      </h1>
      <div v-if="deposits[0]">
        <div class="bg-white rounded-lg overflow-hidden" >
          <table class="w-full table-auto bordered">
            <thead class="border-b">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Infot</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(deposit, index) in lastFiveDeposit" :key="deposit.id" class="bg-white px-2 border-b">
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

    <hr class="my-5" />
    <div>

      <h1 class="pb-4 text-white">
        সর্বশেষ নিবন্ধিত সদস্য
      </h1>
    
      <div class="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl rounded-2xl shadow-2xl overflow-hidden">
        <div class="space-y-2">
          <div v-for="member in lastFiveMembers" :key="member.id" class="flex items-center justify-between border-b px-4 py-2">
            <div class="flex">
              <span class="pr-3 font-bold">  {{ member.id }} </span>
              <span class="text-gray-800">  {{ member.name }}</span>
            </div>
            <div class="flex space-x-2">
              <NuxtLink v-if="auth.isAdmin" :to="`/users/${member.id}`" class="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-all duration-200 shadow-lg">
                <i class="fas fa-edit"></i>
              </NuxtLink>
              <!-- <button @click="deleteMember(member.id)" class="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-105 transition-all duration-200 shadow-lg">
                <i class="fas fa-trash"></i>
              </button> -->
              <NuxtLink :to="`/users/view/${member.id}`" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-3 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg inline-block">
                <i class="fas fa-angle-right"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-5" v-else>
   <div class=" bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <h2 class="text-sm font-medium text-gray-600"> আমার আমানত </h2>
      <p class="text-2xl font-bold text-gray-900"> ০০০০ ৳</p>
    </div>
  </div>

</template>


