<template>
  <div>
    <div class="text-center h-full border rounded py-10">
      <div class="font-bold mb-4 text-center">
        <h1>Hello !</h1>
      </div>
      <div class="text-center">Welcome to our page.</div>
      <div>
        <div class="my-4">Please select which test you want to start now.</div>
        <ul class="list-none -ml-4">
          <li class="before:content-['→'] before:mr-2 before:text-blue-600">
            <span class="text-blue-600 hover:underline cursor-pointer" @click="goToTest('math')"> Mathematics </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToTest(test) {
  router.push(`/${test}`)
}
</script>