<template>
  <div>
    <div class="border rounded p-4 sm:p-10">
      <button class="flex items-center cursor-pointer hover:text-blue-800 transition-colors mb-5 sm:mb-0 sm:absolute" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Back
      </button>
      <div class="text-center mb-10">
        <div class="text-3xl font-extrabold underline mb-2">Mathematics Test</div>
        <div>( Rounding Off to Nearest 10 )</div>
      </div>
      <div class="flex items-center border-b-1 pb-10 mb-10">
        <div class="flex-none w-20">Name:</div>
        <div class="flex-1">
          <input
            v-model="userName"
            type="text"
            placeholder="Enter Your Name"
            class="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            :class="[{ 'border-red-500': isInvalid }, { 'border-gray-300': !isInvalid }]"
            :required="true"
          />
          <p v-if="isInvalid" class="mt-1 text-sm text-red-600 absolute">Please enter your name.</p>
        </div>
      </div>
      <div class="md:grid grid-cols-2 gap-4">
        <div v-for="(question, index) in formSettings" :key="index">
          <question-items :question="question" :userAnswers="userAnswers" :showCorrectAnswer="showCorrectAnswer" @selectAnswer="selectAnswer" />
        </div>
      </div>
      <div class="flex justify-end mt-10">
        <button @click="resetAnswer" class="min-w-25 py-2 px-4 bg-white hover:bg-cyan-300 text-gray-800 font-medium rounded-md transition-colors duration-200 mr-4">Reset</button>
        <button
          @click="submit"
          :disabled="!isEmpty(unansweredIds)"
          :class="{
            'bg-blue-600 hover:bg-blue-700': isEmpty(unansweredIds),
            'bg-blue-300 cursor-not-allowed': !isEmpty(unansweredIds),
          }"
          class="min-w-25 py-2 px-4 text-white font-medium rounded-md transition-colors duration-200"
        >
          Submit
        </button>
      </div>

      <dialog-box :show="openDialog" :totalScore="totalScore" :userName="userName" @close="openDialog = false" />
    </div>
    <p class="text-right text-xs mt-2 pr-2">copyright: www.mathinenglish.com</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, watch } from 'vue'
import { forEach, differenceBy, isEmpty, find, reduce, isNull } from 'lodash'
import QuestionItems from '@/components/QuestionItems.vue'
import DialogBox from '@/components/DialogBox.vue'

const router = useRouter()
const userName = ref('')
const userAnswers = ref([])
const totalScore = ref(0)
let showCorrectAnswer = ref(false)
let isInvalid = ref(false)
let openDialog = ref(false)
const formSettings = [
  {
    id: 1,
    number: 17,
    options: {
      a: 10,
      b: 20,
      c: 17,
    },
    answer: 20,
    marks: 1,
  },
  {
    id: 2,
    number: 45,
    options: {
      a: 50,
      b: 45,
      c: 40,
    },
    answer: 50,
    marks: 1,
  },
  {
    id: 3,
    number: 75,
    options: {
      a: 70,
      b: 80,
      c: 175,
    },
    answer: 80,
    marks: 1,
  },
  {
    id: 4,
    number: 19,
    options: {
      a: 20,
      b: 10,
      c: 19,
    },
    answer: 20,
    marks: 1,
  },
  {
    id: 5,
    number: 64,
    options: {
      a: 64,
      b: 70,
      c: 60,
    },
    answer: 60,
    marks: 1,
  },
  {
    id: 6,
    number: 0,
    options: {
      a: 10,
      b: 1,
      c: 0,
    },
    answer: 0,
    marks: 1,
  },
  {
    id: 7,
    number: 98,
    options: {
      a: 80,
      b: 100,
      c: 89,
    },
    answer: 100,
    marks: 1,
  },
  {
    id: 8,
    number: 199,
    options: {
      a: 190,
      b: 100,
      c: 200,
    },
    answer: 200,
    marks: 1,
  },
  {
    id: 9,
    number: 94,
    options: {
      a: 100,
      b: 94,
      c: 90,
    },
    answer: 90,
    marks: 1,
  },
  {
    id: 10,
    number: 165,
    options: {
      a: 160,
      b: 170,
      c: 150,
    },
    answer: 170,
    marks: 1,
  },
  {
    id: 11,
    number: 445,
    options: {
      a: 450,
      b: 440,
      c: 500,
    },
    answer: 450,
    marks: 1,
  },
  {
    id: 12,
    number: 999,
    options: {
      a: 990,
      b: 1000,
      c: 909,
    },
    answer: 1000,
    marks: 1,
  },
]

watch(userName, (newValue) => {
  if (newValue) isInvalid.value = false
})

const unansweredIds = computed(function () {
  return differenceBy(formSettings, userAnswers.value, 'id')
})

const goBack = () => {
  router.push('/')
}

const selectAnswer = (id, answer) => {
  userAnswers.value.push({
    id,
    answer,
  })
}

const resetAnswer = () => {
  userAnswers.value = []
}

const submit = () => {
  console.log(userName.value)

  if (!userName.value) {
    isInvalid.value = true
    return
  }

  totalScore.value = reduce(
    userAnswers.value,
    (result, item) => {
      const formSetting = find(formSettings, { id: item.id })

      if (formSetting.answer == item.answer) {
        result += formSetting.marks
      }

      return result
    },
    0
  )

  showCorrectAnswer.value = true
  openDialog.value = true
}
</script>