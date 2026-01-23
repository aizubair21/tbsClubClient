<script setup>
const auth = useAuthStore()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

const isAsideOpen = ref(false)

const logout = () => {
  auth.logout()
  navigateTo('/login')
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Mobile backdrop -->
    <div v-if="isAsideOpen" @click="isAsideOpen = false" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>

    <!-- Aside -->
    <aside class="w-64 bg-gray-800 text-white fixed inset-y-0 left-0 z-50 transform -translate-x-full transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block" :class="{ 'translate-x-0': isAsideOpen }">
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4">Navigation</h2>
        <nav class="space-y-2">
          <NuxtLink to="/members" class="block py-2 px-4 rounded hover:bg-gray-700">Members</NuxtLink>
          <NuxtLink to="/deposits" class="block py-2 px-4 rounded hover:bg-gray-700">Deposits</NuxtLink>
          <NuxtLink v-if="auth.isAdmin" to="/users" class="block py-2 px-4 rounded hover:bg-gray-700">Users</NuxtLink>
        </nav>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <div class="flex items-center">
          <button @click="isAsideOpen = !isAsideOpen" class="md:hidden mr-2 text-gray-600 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 class="text-xl font-semibold">Committee Management</h1>
        </div>
        <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </header>

      <!-- Main -->
      <main class="flex-1 p-6">
        <h2 class="text-2xl font-bold mb-4">Welcome, {{ auth.role }}</h2>
        <!-- Additional content can go here -->
      </main>
    </div>
  </div>
</template>


