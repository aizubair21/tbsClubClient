<script setup>
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

const auth = useAuthStore()
const username = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)

const login = async () => {
  try {
    await auth.login(username.value, password.value)
    await navigateTo('/')
  } catch (e) {
    console.log(e);
    error.value = 'Invalid credentials'
  }
}

const particlesInit = async (engine) => {
  await loadSlim(engine)
}

const particlesLoaded = async (container) => {
  console.log('Particles container loaded', container)
}

const particlesOptions = {
  background: {
    color: {
      value: '#f3f4f6',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#3b82f6',
    },
    links: {
      color: '#3b82f6',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <p class="text-2xl text-center font-bold font-sans mb-4"> তারকারাজী বিজনেস লগিন </p>
      <!-- <h1 class="text-2xl font-bold text-center mb-4">Login</h1> -->
      <form @submit.prevent="login" class="space-y-4">
        <input v-model="username" type="text" placeholder="Username" required class="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <div class="relative">
          <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" required class="border border-gray-300 rounded-md px-3 py-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </button>
        </div>
        <button type="submit" class="bg-blue-500 text-white rounded-md py-2 w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Login</button>
      </form>
      <p v-if="error" class="text-red-500 text-sm text-center mt-4">{{ error }}</p>
    </div>
  </div>
</template>


