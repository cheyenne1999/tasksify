<template>
  <div class="p-6 text-center">
    <h1 class="text-3xl font-bold mb-4">About This Project</h1>
    <p class="text-gray-600 mb-6">
      This is a sample task management app created to demonstrate Vue/Nuxt along
      with TailwindCSS together with Laravel as the backend skills.
    </p>
    <div class="flex justify-center gap-8">
      <div>
        <p class="text-2xl font-bold text-green-500">{{ tasks }}</p>
        <p class="text-gray-500">Tasks Created</p>
      </div>
      <div>
        <p class="text-2xl font-bold text-blue-500">{{ users }}</p>
        <p class="text-gray-500">Active Users</p>
      </div>
    </div>
    <div>
      <p class="text-xs text-gray-500 mt-3">
        by the way, the numbers above are generated randomly, not real time
      </p>
    </div>
    <div class="flex flex-col items-center">
      <h2 class="mt-[5%] text-2xl font-bold text-gray-500">
        Click here to see a surprise!
      </h2>
      <NuxtLink
        to="/joke"
        class="bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-600 transition"
      >
        Click Me
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const tasks = ref(0);
const users = ref(0);

onMounted(() => {
  let t = 0;
  let u = 0;
  const interval = setInterval(() => {
    if (t < 120) t++;
    if (u < 15) u++;
    tasks.value = t;
    users.value = u;
    if (t === 120 && u === 15) clearInterval(interval);
  }, 20);
});
</script>
