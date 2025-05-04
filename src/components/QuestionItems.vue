<template>
  <div>
    <div>{{ question?.id }}. {{ question?.number }} rounded off to the nearest 10 is ?</div>
    <ul class="list-none pl-4">
      <li class="before:mr-2 before:text-blue-600 flex items-center my-2 cursor-pointer" v-for="(choice, idx) in question?.options" :key="idx" @click="selectAnswer(choice, idx)">
        <div
          class="mr-2 px-2 py-0.5"
          :class="{
            'border rounded-full': selected.answer == choice || (showCorrectAnswer && selected.answer != question.answer && choice == question.answer),
            'border-red-500': showCorrectAnswer && selected.answer != question.answer && choice == question.answer,
          }"
        >
          {{ idx }}.
        </div>
        <div>
          {{ choice }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { find } from 'lodash'

const props = defineProps({
  question: {
    type: Object,
    default: () => {},
  },
  userAnswers: {
    type: Array,
    default: () => [],
  },
  showCorrectAnswer: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['selectAnswer'])

let selected = ref({})

watch(
  () => props.userAnswers,
  () => {
    const answer = find(props.userAnswers, { id: props.question.id })
    selected.value.answer = answer?.answer || null
  },
  { immediate: true }
)

const selectAnswer = (answer, idx) => {
  if (props.showCorrectAnswer) return
  
  emit('selectAnswer', props.question.id, answer)
  selected.value.answer = answer
}
</script>