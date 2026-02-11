<script setup>
// import Particles from '@tsparticles/vue3'
// import { loadSlim } from '@tsparticles/slim'

const form = ref({
  username: '',
  password: '',
  role: 'user',
  name: '',
  email: '',
  father_name: '',
  mother_name: '',
  nid: '',
  address: '',
  phone: ''
})

const errors = ref({})
const isSubmitting = ref(false)

definePageMeta({
  layout: false,
})

const validateForm = () => {
  errors.value = {}

  // Username validation
  if (!form.value.username.trim()) {
    errors.value.username = 'Username is required'
  } else if (form.value.username.length < 3) {
    errors.value.username = 'Username must be at least 3 characters'
  }

  // Name validation
  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Invalid email format'
  }

  // Father name validation
  if (!form.value.father_name.trim()) {
    errors.value.father_name = 'Father name is required'
  }

  // Mother name validation
  if (!form.value.mother_name.trim()) {
    errors.value.mother_name = 'Mother name is required'
  }

  // NID validation
  if (!form.value.nid.trim()) {
    errors.value.nid = 'NID is required'
  } else if (!/^\d{10,17}$/.test(form.value.nid)) {
    errors.value.nid = 'NID must be 10-17 digits'
  }

  // Address validation
  if (!form.value.address.trim()) {
    errors.value.address = 'Address is required'
  }

  // Phone validation
  const phoneRegex = /^(017|013|018|019|014|015)\d{8}$/
  if (!form.value.phone.trim()) {
    errors.value.phone = 'Phone number is required'
  } else if (!phoneRegex.test(form.value.phone)) {
    errors.value.phone = 'Invalid phone number format'
  }

  return Object.keys(errors.value).length === 0
}

const register = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch('/api/users', {
      method: 'POST',
      body: form.value
    })

    // Show success toast
    // const toast = useNuxtApp().$toast
    // toast.success('Registration successful! Please login.')

    // Redirect to login
    await navigateTo('/login')
  } catch (error) {
    console.error('Registration error:', error)
    // const toast = useNuxtApp().$toast
    // toast.error(error.data?.message || 'Registration failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// const particlesInit = async (engine) => {
//   await loadSlim(engine)
// }

// const particlesLoaded = async (container) => {
//   console.log('Particles container loaded', container)
// }

// const particlesOptions = {
//   background: {
//     color: {
//       value: '#f3f4f6',
//     },
//   },
//   fpsLimit: 120,
//   interactivity: {
//     events: {
//       onClick: {
//         enable: true,
//         mode: 'push',
//       },
//       onHover: {
//         enable: true,
//         mode: 'repulse',
//       },
//       resize: true,
//     },
//     modes: {
//       push: {
//         quantity: 4,
//       },
//       repulse: {
//         distance: 200,
//         duration: 0.4,
//       },
//     },
//   },
//   particles: {
//     color: {
//       value: '#3b82f6',
//     },
//     links: {
//       color: '#3b82f6',
//       distance: 150,
//       enable: true,
//       opacity: 0.5,
//       width: 1,
//     },
//     move: {
//       direction: 'none',
//       enable: true,
//       outModes: {
//         default: 'bounce',
//       },
//       random: false,
//       speed: 2,
//       straight: false,
//     },
//     number: {
//       density: {
//         enable: true,
//       },
//       value: 80,
//     },
//     opacity: {
//       value: 0.5,
//     },
//     shape: {
//       type: 'circle',
//     },
//     size: {
//       value: { min: 1, max: 5 },
//     },
//   },
//   detectRetina: true,
// }
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden py-8">
    <div class="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-lg relative z-10 transform hover:scale-105 transition-transform duration-300">
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
        </div>
        <p class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-sans">তারকারাজী বিজনেস রেজিস্ট্রেশন</p>
      </div>
      <form @submit.prevent="register" class="space-y-4">
        <div class="">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="border-2 border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 text-lg"
            />
            <p v-if="errors.username" class="text-red-600 text-sm mt-1">{{ errors.username }}</p>
          </div>
        </div>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="border-2 border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 text-lg"
          />
          <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="border-2 border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 text-lg"
          />
          <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="father_name" class="block text-sm font-medium text-gray-700 mb-2">Father's Name</label>
            <input
              id="father_name"
              v-model="form.father_name"
              type="text"
              required
              class="border-2 border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 text-lg"
            />
            <p v-if="errors.father_name" class="text-red-600 text-sm mt-1">{{ errors.father_name }}</p>
          </div>
          <div>
            <label for="mother_name" class="block text-sm font-medium text-gray-700 mb-2">Mother's Name</label>
            <input
              id="mother_name"
              v-model="form.mother_name"
              type="text"
              required
              class="border-2 border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 text-lg"
            />
            <p v-if="errors.mother_name" class="text-red-600 text-sm mt-1">{{ errors.mother_name }}</p>
          </div>
        </div>

        <div>
          <label for="nid" class="block text-sm font-medium text-gray-700 mb-2">NID</label>
          <input
            id="nid"
            v-model="form.nid"
            type="text"
            required
            class="border-2 border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 text-lg"
          />
          <p v-if="errors.nid" class="text-red-600 text-sm mt-1">{{ errors.nid }}</p>
        </div>

        <div>
          <label for="address" class="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            id="address"
            v-model="form.address"
            required
            rows="3"
            class="border-2 border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 text-lg"
          ></textarea>
          <p v-if="errors.address" class="text-red-600 text-sm mt-1">{{ errors.address }}</p>
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            required
            class="border-2 border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 text-lg"
          />
          <p v-if="errors.phone" class="text-red-600 text-sm mt-1">{{ errors.phone }}</p>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 w-full hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Registering...' : 'Register' }}
        </button>
      </form>
      <div class="text-center mt-6">
        <p class="text-gray-600">Already have an account? <NuxtLink to="/login" class="text-purple-600 hover:text-purple-800 font-semibold">Login here</NuxtLink></p>
      </div>
    </div>
  </div>
</template>
