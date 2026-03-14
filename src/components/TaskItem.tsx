import { Task } from "../types/task";
import { useTasks } from "../context/TaskContext";
import { useEffect, useState } from "react";
import "./TaskItem.css";

interface Props {
  task: Task;
  isNew?: boolean;
}

export default function TaskItem({ task, isNew = false }: Props) {
  const { deleteTask, startEditing } = useTasks();
  const isDone = task.status === "done";
  const [animate, setAnimate] = useState(isNew);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      setDeleteError(null);
      await deleteTask(task.id);
    } catch (error: any) {
      if (error.response?.status === 403) {
        setDeleteError("Unauthorized: Invalid auth token");
      } else {
        setDeleteError("Failed to delete task");
      }
    }
  };

  const priorityClass = `priority-${task.priority}`;
  const statusClass = task.status === "pending" 
    ? "status-pending" 
    : task.status === "in_progress" 
      ? "status-progress" 
      : "status-done";

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <div
      className={`task-card-wrapper ${priorityClass} ${isDone ? "priority-done" : ""}`}
    >
      <div className="task-card">
        <div className="task-card-inner">
          <div className="card-header">
            <div className={`priority-badge ${priorityClass}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </div>
            <span className={`status-text ${statusClass}`}>
              {task.status === "pending" 
                ? "Pending" 
                : task.status === "in_progress" 
                  ? "In Progress" 
                  : "Completed"}
            </span>
          </div>

          <h3 className={`task-title ${priorityClass} ${isDone ? "task-title-done" : ""}`}>
            {task.title}
          </h3>
          <p className="task-desc">{task.description || "No description provided"}</p>

          <div className="card-actions">
            <button
              onClick={() => startEditing(task)}
              className="btn edit-btn"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="btn delete-btn">
              Delete
            </button>
          </div>
          {deleteError && (
            <div className="error-msg">{deleteError}</div>
          )}
        </div>
      </div>
    </div>
  );
}