export type Priority = "low" | "medium" | "high";

export type Status = "pending" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
}