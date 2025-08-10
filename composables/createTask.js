import { API_BASE_URL } from "@/src/config/api";

export const createTask = async (taskData) => {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) throw new Error("Failed to create task");
  return await res.json();
};
