<script setup>
import Button from '~/components/Button.vue'

const auth = useAuthStore()
const isAsideOpen = ref(false)

const logout = () => {
  auth.logout()
  navigateTo('/login')
}
</script>

<template>

  <div class="min-h-screen flex bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
    <!-- Mobile backdrop -->
    <div v-if="isAsideOpen" @click="isAsideOpen = false" class="fixed inset-0 bg-opacity-50 z-40 md:hidden"></div>

    <!-- Aside -->
    <aside class="w-64 bg-gray-800 lg:opacity-70 text-white fixed inset-y-0 left-0 z-50 transform -translate-x-full transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block" :class="{ 'translate-x-0': isAsideOpen }">
      <div class="p-4">
        <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </div>
        <p class="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-sans">
          <!-- role name  -->
        </p>
      </div>
        <nav class="space-y-2">
          <NuxtLink to="/" class="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition-colors">
                  <svg class="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                  </svg>
                  ড্যাশবোর্ড
                </NuxtLink>
                <NuxtLink to="/users" class="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition-colors">
                  <svg class="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                  সদস্যবৃন্দ
                </NuxtLink>
                <NuxtLink to="/deposits" class="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition-colors">
                  <svg class="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  আমানত
                </NuxtLink>
                <NuxtLink v-if="auth.isAdmin" to="/members" class="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition-colors">
                  <svg class="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  পরিচালক
                </NuxtLink>
                <!-- <hr></hr>
                <button @click="logout" class="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">  লগআউট </button> -->
        </nav>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="border-b shadow p-4 flex justify-between items-center">
        <div class="flex items-center">
          <button @click="isAsideOpen = !isAsideOpen" class="md:hidden mr-2 text-gray-600 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 class="text-xl font-semibold">তারকারাজী বিজনেস</h1>
        </div>
        <Button variant="danger" @click="logout">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <p>

            লগআউট
          </p>
        </Button>
      </header>

      <!-- Main -->
      <main class="flex-1 p-6">
        <!-- Additional content can go here -->
        <slot></slot>
      </main>
   </div>
   </div>
</template>
