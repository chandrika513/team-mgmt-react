import { createContext, useContext, useEffect, useState } from "react";
import { Task } from "../tasksdata/task";
import * as api from "../api/taskApi";

// Simple types - just define the shape
const TaskContext = createContext<any>(null);

// Hook to use context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used inside TaskProvider");
  return context;
};

// Simple function component
export function TaskProvider({ children }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const loadTasks = async () => {
    const data = await api.getTasks();
    setTasks(data);
  };

  const addTask = async (task: any) => {
    const newTask = await api.createTask(task);
    setTasks((prev: Task[]) => [newTask, ...prev]);
  };

  const updateTask = async (id: string, task: any) => {
    const updated = await api.updateTask(id, task);
    setTasks((prev: Task[]) => prev.map(t => t.id === id ? updated : t));
    setEditingTask(null);
  };

  const deleteTask = async (id: string) => {
    await api.deleteTask(id);
    setTasks((prev: Task[]) => prev.filter(t => t.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, editingTask, startEditing, cancelEditing }}>
      {children}
    </TaskContext.Provider>
  );
}