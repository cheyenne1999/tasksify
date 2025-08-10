<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navigation header -->
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Tasksify</h1>
        <div class="space-x-4">
          <NuxtLink to="/" class="hover:text-gray-300">Home</NuxtLink>
          <NuxtLink to="/tasks" class="hover:text-gray-300">Tasks</NuxtLink>
          <NuxtLink to="/about" class="hover:text-gray-300">About</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main content area - this is where your pages will be rendered -->
    <main class="container mx-auto p-4 flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-300 p-4 mt-8">
      <div class="container mx-auto text-center text-gray-600">
        © 2024 Task Manager. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
// This is the default layout
// It will be automatically applied to all pages unless specified otherwise
</script>
