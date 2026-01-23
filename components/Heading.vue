<template>
  <component
    :is="level"
    :class="headingClasses"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  level: {
    type: String,
    default: 'h1',
    validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
  },
  gradient: {
    type: Boolean,
    default: true
  }
})

const headingClasses = computed(() => {
  const baseClasses = 'font-bold font-sans'

  let sizeClasses = ''
  switch (props.level) {
    case 'h1':
      sizeClasses = 'text-4xl'
      break
    case 'h2':
      sizeClasses = 'text-3xl'
      break
    case 'h3':
      sizeClasses = 'text-2xl'
      break
    case 'h4':
      sizeClasses = 'text-xl'
      break
    case 'h5':
      sizeClasses = 'text-lg'
      break
    case 'h6':
      sizeClasses = 'text-base'
      break
  }

  const gradientClasses = props.gradient
    ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
    : 'text-gray-800'

  return `${baseClasses} ${sizeClasses} ${gradientClasses}`
})
</script>
