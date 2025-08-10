<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Tasks</h1>
      <button
        @click="showCreateModal = true"
        class="rgb-hover bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Task
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
      ></div>
      <p class="mt-2 text-gray-600">Loading tasks...</p>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
    >
      <p class="text-red-800">Error loading tasks: {{ error }}</p>
      <button
        @click="loadTasks"
        class="mt-2 text-red-600 hover:text-red-800 underline"
      >
        Try again
      </button>
    </div>

    <!-- Task content -->
    <div v-else>
      <!-- Task Filters -->
      <div class="bg-white p-4 rounded-lg shadow-md mb-6">
        <div class="flex flex-wrap gap-4">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="activeFilter = filter.value"
            :class="[
              'px-4 py-2 rounded transition-colors',
              activeFilter === filter.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Task List -->
      <div v-if="filteredTasks.length === 0" class="text-center py-8">
        <p class="text-gray-600">No tasks found.</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="task in filteredTasks"
          :key="task.id"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="toggleTaskStatus(task.id)"
                class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <h3
                  :class="[
                    'text-lg font-semibold',
                    task.completed
                      ? 'line-through text-gray-500'
                      : 'text-gray-800',
                  ]"
                >
                  {{ task.title }}
                </h3>
                <p v-if="task.description" class="text-gray-600 p-3">
                  {{ task.description }}
                </p>
                <div class="flex items-center space-x-4 mt-2">
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getPriorityClass(task.priority),
                    ]"
                  >
                    {{ task.priority }}
                  </span>
                  <span
                    class="bg-gray-200 px-2 py-2 rounded-full text-xs font-medium"
                  >
                    Due: {{ task.due_date }}</span
                  >
                  <span v-if="task.dueDate" class="text-sm text-gray-500">
                    Due: {{ formatDate(task.dueDate) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                @click="editTask(task.id, task)"
                class="bg-[#007bff] text-white rounded w-full p-3 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                @click="deleteTaskById(task.id)"
                class="bg-red-500 text-white rounded w-full p-2 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CreateTaskModal
    :show="showCreateModal"
    :taskForm="taskForm"
    @close="closeModal"
    @submit="createNewTask"
  />

  <EditTaskModal
    :show="showEditModal"
    :taskForm="taskForm"
    @close="closeModal"
    @submit="updateTaskById"
  />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import CreateTaskModal from "@/components/Modal/CreateTaskModal.vue";
import EditTaskModal from "@/components/Modal/EditTaskModal.vue";
import { snackbarStore } from "@/composables/snackbarStore";
const { openSnackbar } = snackbarStore();
// Reactive data
const loading = ref(false);
const error = ref(null);
const tasks = ref([]);
const activeFilter = ref("all");
const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingTaskId = ref(null);

const taskForm = ref({
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
});

// Filter options
const filters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

// Computed property for filtered tasks
const filteredTasks = computed(() => {
  switch (activeFilter.value) {
    case "active":
      return tasks.value.filter((task) => !task.completed);
    case "completed":
      return tasks.value.filter((task) => task.completed);
    default:
      return tasks.value;
  }
});

// API composable
// const { toggleTask } = useTasks();
import { getTasks } from "~/composables/getTasks";
import { createTask } from "~/composables/createTask";
import { deleteTask } from "~/composables/deleteTask";
import { updateTask } from "~/composables/updateTask";
import { toggleTask } from "@/composables/toggleTask";
const loadTasks = async () => {
  loading.value = true;
  error.value = null;

  try {
    tasks.value = await getTasks();
  } catch (err) {
    error.value = err.message || "Failed to load tasks";
  } finally {
    loading.value = false;
  }
};

// Toggle task completion
const toggleTaskStatus = async (taskId) => {
  try {
    const updated = await toggleTask(tasks.value, taskId);
    openSnackbar("Task updated successfully!", "success");
  } catch (err) {
    openSnackbar("Task Failed to update!", "error");
  }
};

// Create new task
const createNewTask = async () => {
  try {
    const newTask = await createTask({
      title: taskForm.value.title,
      description: taskForm.value.description,
      priority: taskForm.value.priority,
      due_date: taskForm.value.dueDate || null,
      completed: false,
    });

    tasks.value.unshift(newTask);
    closeModal();
  } catch (err) {
    openSnackbar("Error creating task!", "error");
  }
};

// Edit task
const editTask = (id, task) => {
  if (!task.id) return;

  editingTaskId.value = task.id;
  taskForm.value = {
    title: task.title,
    description: task.description || "",
    priority: task.priority,
    dueDate: task.due_date ? task.due_date.split("T")[0] : "",
  };
  showEditModal.value = true;
};

// Update task
const updateTaskById = async () => {
  if (!editingTaskId.value) return;

  try {
    await updateTask(editingTaskId.value, {
      title: taskForm.value.title,
      description: taskForm.value.description,
      priority: taskForm.value.priority,
      due_date: taskForm.value.dueDate || null,
    });

    // Refresh tasks
    openSnackbar("Task updated successfully!", "success");
    await loadTasks();
    closeModal();
  } catch (err) {
    openSnackbar("Error updating task!", "error");
  }
};

// Delete task
const deleteTaskById = async (taskId) => {
  if (!taskId || !confirm("Are you sure you want to delete this task?")) return;

  try {
    await deleteTask(taskId);
    tasks.value = tasks.value.filter((t) => t.id !== taskId);
  } catch (err) {
    openSnackbar("Error deleting task!", "error");
  }
};

// Close modal
const closeModal = () => {
  showCreateModal.value = false;
  showEditModal.value = false;
  editingTaskId.value = null;
  taskForm.value = {
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  };
};

// Utility functions
const getPriorityClass = (priority) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

// Load tasks on component mount
onMounted(() => {
  loadTasks();
});
</script>
<style scoped>
.rgb-hover {
  /* background: linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet);
  background-size: 400% 400%;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-position 0.3s ease; */
  background-color: rgb(34, 197, 94); /* default green */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
}

.rgb-hover:hover {
  animation: rgbCycle 2s linear infinite;
}

@keyframes rgbCycle {
  0% {
    background-color: rgb(255, 0, 0);
  } /* red */
  33% {
    background-color: rgb(0, 255, 0);
  } /* green */
  66% {
    background-color: rgb(0, 0, 255);
  } /* blue */
  100% {
    background-color: rgb(255, 0, 0);
  } /* back to red */
}
</style>
