import { ref } from "vue";

const message = ref("");
const show = ref(false);
const type = ref("success");
let timeoutId = null;

export function snackbarStore() {
  const openSnackbar = (msg, msgType = "success", duration = 3000) => {
    message.value = msg;
    type.value = msgType;
    show.value = true;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      show.value = false;
    }, duration);
  };

  const closeSnackbar = () => {
    show.value = false;
    clearTimeout(timeoutId);
  };

  return { message, type, show, openSnackbar, closeSnackbar };
}
