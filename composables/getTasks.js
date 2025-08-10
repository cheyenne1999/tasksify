import { API_BASE_URL } from "@/src/config/api";

export const getTasks = async () => {
  const res = await fetch(`${API_BASE_URL}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return await res.json();
};
