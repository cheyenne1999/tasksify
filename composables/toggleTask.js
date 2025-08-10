export const toggleTask = async (tasks, id) => {
  try {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }

    const currentTask = tasks[index];
    if (!currentTask) {
      throw new Error("Task not found");
    }

    const updatedTask = {
      ...currentTask,
      completed: !currentTask.completed,
      updatedAt: new Date().toISOString(),
    };

    tasks[index] = updatedTask;

    return updatedTask;
  } catch (error) {
    console.error("Error toggling task:", error);
    throw error;
  }
};
