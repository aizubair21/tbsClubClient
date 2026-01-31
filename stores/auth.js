import { defineStore } from 'pinia'
import bcrypt from 'bcryptjs'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const role = ref(null)
  const userId = ref(null)

  const login = async (phone) => {
    // Validate phone number
    const phoneRegex = /^(017|013|018|019|014|015)\d{8}$/
    if (!phoneRegex.test(phone)) {
      throw new Error('Invalid phone number.')
    }

    const users = await $fetch('/api/users')
    const user = users.find(u => u.phone === phone)
    if (!user) throw new Error('User not found')
    token.value = 'authenticated'
    role.value = user.role
    userId.value = user.id
  }

  const logout = () => {
    token.value = null
    role.value = null
    userId.value = null
  }

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => role.value === 'admin')

  return { token, role, userId, login, logout, isAuthenticated, isAdmin }
}, {
  persist: true
})
