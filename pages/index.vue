<script setup>
const auth = useAuthStore()

if (!auth.isAuthenticated) {
  await navigateTo('/login')
}

const logout = () => {
  auth.logout()
  navigateTo('/login')
}
</script>

<template>
  <div>
    <header>
      <h1>Committee Management</h1>
      <button @click="logout">Logout</button>
    </header>
    <nav>
      <NuxtLink to="/members">Members</NuxtLink>
      <NuxtLink to="/deposits">Deposits</NuxtLink>
      <NuxtLink v-if="auth.isAdmin" to="/users">Users</NuxtLink>
    </nav>
    <main>
      <h2>Welcome, {{ auth.role }}</h2>
    </main>
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f0f0f0;
}
nav {
  padding: 10px;
}
nav a {
  margin-right: 10px;
}
</style>
