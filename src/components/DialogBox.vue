<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 w-full" v-if="show">
    <div class="border rounded p-10 w-70 sm:w-96 relative bg-black">
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer" aria-label="Close dialog">
        X
      </button>
      <div class="text-3xl font-bold mb-6">Congratulations {{ userName }} !</div>
      <div class="text-lg">
        Your score is : {{ totalScore }}
      </div>
      <div class="text-xs mt-4">
        Thank you for taking part.
      </div>
    </div>
  </div>
</template>

<script setup>
import { get } from 'lodash'

defineEmits(['close'])

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  userName: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
</style>