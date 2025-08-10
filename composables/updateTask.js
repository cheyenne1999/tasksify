import { API_BASE_URL } from "@/src/config/api";

export const updateTask = async (id, updates) => {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) throw new Error("Failed to update task");
  return await res.json();
};
