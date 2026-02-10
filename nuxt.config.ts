// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'],
  css: ['@fortawesome/fontawesome-free/css/all.css'],
  googleFonts: {
    families: {
      'Hind+Siliguri': true,
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Hind Siliguri', 'sans-serif'],
          },
        },
      },
    },
  },
  devtools: { enabled: true },
 
})
