<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'danger', 'secondary'].includes(value)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const buttonClasses = computed(() => {
  const baseClasses = 'rounded-xl py-3 px-6 flex items-center focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-200 text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'

  const widthClass = props.fullWidth ? 'w-full' : ''

  let variantClasses = ''
  switch (props.variant) {
    case 'primary':
      variantClasses = 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
      break
    case 'danger':
      variantClasses = 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
      break
    case 'secondary':
      variantClasses = 'bg-gray-500 text-white hover:bg-gray-600'
      break
  }

  return `${baseClasses} ${widthClass} ${variantClasses}`
})
</script>
