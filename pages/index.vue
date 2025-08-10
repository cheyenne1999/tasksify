<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      Welcome to Task Manager
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Quick Stats Card -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Quick Stats</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Total Tasks:</span>
            <span class="font-bold text-blue-600">{{ taskStats.total }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Completed:</span>
            <span class="font-bold text-green-600">{{
              taskStats.completed
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Pending:</span>
            <span class="font-bold text-orange-600">{{
              taskStats.pending
            }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions Card -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <div class="space-y-3">
          <NuxtLink
            to="/tasks"
            class="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center transition-colors"
          >
            View All Tasks
          </NuxtLink>
          <button
            @click="navigateToTasks"
            class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            Add New Task
          </button>
        </div>
      </div>

      <!-- Recent Activity Card -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          Recent Activity
        </h3>
        <div class="space-y-2 text-sm">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex justify-between"
          >
            <span class="text-gray-600 px-2">{{ activity.description }}</span>
            <span class="text-gray-400 text-right">{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Reactive data
const tasks = ref([]);
const loading = ref(false);

import { snackbarStore } from "@/composables/snackbarStore";
const { openSnackbar } = snackbarStore();
// API composable
import { getTasks } from "~/composables/getTasks";

// Computed properties
const taskStats = computed(() => {
  const total = tasks.value.length;
  const completed = tasks.value.filter((task) => task.completed).length;
  const pending = total - completed;

  return { total, completed, pending };
});

const recentActivities = computed(() => {
  if (!tasks.value.length) return [];

  // Add recent task activities
  const recentTasks = [...tasks.value]
    .sort(
      (a, b) =>
        new Date(b.updated_at || b.created_at || "").getTime() -
        new Date(a.updated_at || a.created_at || "").getTime()
    )
    .slice(0, 3); // Take only top 3

  return recentTasks.map((task) => {
    const time = formatTimeAgo(task.updated_at || task.created_at || "");
    return task.completed
      ? {
          id: `completed-${task.id}`,
          description: `Task completed: ${task.title}`,
          time,
        }
      : {
          id: `created-${task.id}`,
          description: `New task added: ${task.title}`,
          time,
        };
  });
});

// Methods
// const loadTasks = async () => {
//   loading.value = true;
//   try {
//     tasks.value = await getTasks();
//   } catch (error) {
//     console.error("Error loading tasks:", error);
//   } finally {
//     loading.value = false;
//   }
// };

const loadTasks = async () => {
  loading.value = true;
  try {
    const fetchedTasks = await getTasks();
    tasks.value = Array.isArray(fetchedTasks) ? fetchedTasks : [];
  } catch (error) {
    openSnackbar("Error loading tasks!", "error");
    tasks.value = [];
  } finally {
    loading.value = false;
  }
};

const navigateToTasks = () => {
  navigateTo("/tasks");
};

const formatTimeAgo = (dateString) => {
  if (!dateString) return "No date found";

  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString();
};

// Load tasks on component mount
onMounted(() => {
  loadTasks();
});
</script>
