import axios from "axios";
import { Task } from "../types/task";

const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:8000") + "/tasks";

interface TasksResponse {
  tasks: Task[];
}

interface TaskResponse {
  task: Task;
}

export const getTasks = async () => {
  const res = await axios.get<TasksResponse>(`${API_BASE_URL}/all`);
  return res.data.tasks;
};

export const createTask = async (task: Omit<Task, "id">) => {
  const res = await axios.post<TaskResponse>(`${API_BASE_URL}/create`, task);
  return res.data.task;
};

export const updateTask = async (id: string, task: Partial<Task>) => {
  const res = await axios.put<TaskResponse>(`${API_BASE_URL}/${id}`, task);
  return res.data.task;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-delete-token": "task-manager-secret",
    },
  });
  return id;
};