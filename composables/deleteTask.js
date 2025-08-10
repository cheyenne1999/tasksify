import { API_BASE_URL } from "@/src/config/api";

export const deleteTask = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete task");
};
