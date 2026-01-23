import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const role = ref(null)

  const login = async (username, password) => {
    const res = await $fetch('http://localhost:3001/login', {
      method: 'POST',
      body: { username, password }
    })
    token.value = res.token
    role.value = res.role
  }

  const logout = () => {
    token.value = null
    role.value = null
  }

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => role.value === 'admin')

  return { token, role, login, logout, isAuthenticated, isAdmin }
}, {
  persist: true
})
