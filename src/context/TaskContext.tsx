import { createContext, useContext, useEffect, useState } from "react";
import { Task } from "../types/task";
import * as api from "../api/taskApi";

const TaskContext = createContext<any>(null);

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used inside TaskProvider");
  return context;
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const loadTasks = async () => {
    const data = await api.getTasks();
    setTasks(data);
  };

  const addTask = async (task: Omit<Task, "id">) => {
    const newTask = await api.createTask(task);
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    const updated = await api.updateTask(id, task);
    setTasks((prev) => prev.map(t => t.id === id ? updated : t));
    setEditingTask(null);
  };

  const deleteTask = async (id: string) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter(t => t.id !== id));
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