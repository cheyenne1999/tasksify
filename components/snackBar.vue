<template>
  <transition name="fade">
    <div v-if="show" class="snackbar" :class="type">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { snackbarStore } from "@/composables/snackbarStore";
const { message, type, show } = snackbarStore();
</script>

<style scoped>
.snackbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 20px;
  border-radius: 6px;
  color: white;
}
.snackbar.success {
  background: green;
}
.snackbar.error {
  background: red;
}
.snackbar.info {
  background: blue;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
