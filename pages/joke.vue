<template>
  <div class="text-center py-10">
    <h1 class="text-3xl font-bold mb-6">About Tasksify</h1>
    <p class="text-gray-600 mb-8">
      This is a test project built to demonstrate Nuxt, TailwindCSS, and
      interactivity.
    </p>

    <!-- Surprise Button -->
    <button
      @click="showSurprise"
      class="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
    >
      🎁 Click Me for a Surprise
    </button>

    <!-- Surprise Text -->
    <p
      v-if="surprise"
      class="mt-6 text-lg font-semibold text-purple-700 transition-opacity duration-500"
    >
      {{ surprise }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const surprises = [
  "Why don’t skeletons fight each other? They don’t have the guts.",
  "Did you know? Honey never spoils — archaeologists found 3000-year-old honey that’s still edible!",
  "The first computer ‘bug’ was an actual moth stuck in a computer in 1947.",
  "Believe in yourself. Even your code errors are just features in disguise.",
  "Why do programmers prefer dark mode? Because light attracts bugs!",
];

const surprise = ref("");

function showSurprise() {
  const randomIndex = Math.floor(Math.random() * surprises.length);
  surprise.value = surprises[randomIndex];
}
</script>
