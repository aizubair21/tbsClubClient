import { defineStore } from 'pinia'
import bcrypt from 'bcryptjs'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const role = ref(null)

  const login = async (username, password) => {
    const users = await $fetch('https://tbs-vercel.vercel.app/users')
    const user = users.find(u => u.username === username)
    if (!user) throw new Error('User not found')
    if (!bcrypt.compareSync(password, user.password)) throw new Error('Invalid credentials')
    token.value = 'authenticated'
    role.value = user.role
  }

  const logout = () => {
    token.value = null
    role.value = null
  }

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => role.value === 'accountant')

  return { token, role, login, logout, isAuthenticated, isAdmin }
}, {
  persist: true
})
