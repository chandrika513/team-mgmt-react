import { Task } from "../tasksdata/task";
import { useTasks } from "../context/TaskContext";
import { useEffect, useState } from "react";
import { buttonBase, tokens } from "../styles/shared";

interface Props {
  task: Task;
  isNew?: boolean;
}

const TaskItem = ({ task, isNew = false }: Props) => {
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

  const priorityStyles: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    high: {
      bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
      border: "#f59e0b",
      text: "#92400e",
      glow: "rgba(245, 158, 11, 0.3)",
    },
    medium: {
      bg: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
      border: "#6366f1",
      text: "#3730a3",
      glow: "rgba(99, 102, 241, 0.3)",
    },
    low: {
      bg: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
      border: "#10b981",
      text: "#065f46",
      glow: "rgba(16, 185, 129, 0.3)",
    },
  };

  const statusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: "Pending", color: "#6b7280" },
    in_progress: { label: "In Progress", color: "#3b82f6" },
    done: { label: "Completed", color: "#10b981" },
  };

  const pStyle = priorityStyles[task.priority];
  const sConfig = statusConfig[task.status];

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <div
      style={{
        ...styles.card,
        background: pStyle.bg,
        boxShadow: isDone
          ? "0 4px 12px rgba(0,0,0,0.05)"
          : `0 8px 30px ${pStyle.glow}, 0 2px 8px rgba(0,0,0,0.08)`,
        opacity: isDone ? 0.75 : 1,
        transform: isDone ? "scale(0.98)" : "scale(1)",
      }}
    >
      <div style={styles.cardInner}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ ...styles.priorityBadge, borderColor: pStyle.border, color: pStyle.text }}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </div>
          <span style={{ ...styles.statusText, color: sConfig.color }}>
            {sConfig.label}
          </span>
        </div>

        {/* Content */}
        <h3 style={{ ...styles.title, textDecoration: isDone ? "line-through" : "none", color: pStyle.text }}>
          {task.title}
        </h3>
        <p style={styles.description}>{task.description || "No description provided"}</p>

        {/* Actions */}
        <div style={styles.actions}>
          <button
            onClick={() => startEditing(task)}
            style={styles.editBtn}
          >
            Edit
          </button>
          <button onClick={handleDelete} style={styles.deleteBtn}>
            Delete
          </button>
        </div>
        {deleteError && (
          <div style={styles.errorMessage}>{deleteError}</div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    borderRadius: "20px",
    marginBottom: "16px",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    border: "1px solid rgba(255,255,255,0.5)",
  },
  cardInner: {
    padding: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  priorityBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    border: "2px solid",
    background: "rgba(255,255,255,0.5)",
    transition: "all 0.3s ease",
  },
  statusText: {
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "1.125rem",
    fontWeight: 700,
    lineHeight: 1.4,
    transition: "all 0.3s ease",
  },
  description: {
    margin: "0 0 20px 0",
    fontSize: "0.875rem",
    color: tokens.colors.text.secondary,
    lineHeight: 1.5,
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  editBtn: {
    ...buttonBase,
    background: tokens.colors.white,
    border: `1px solid ${tokens.colors.border}`,
    color: tokens.colors.text.secondary,
    boxShadow: tokens.shadows.md,
  },
  deleteBtn: {
    ...buttonBase,
    padding: "10px 14px",
    background: tokens.colors.errorBg,
    color: tokens.colors.error,
    border: "none",
    boxShadow: tokens.shadows.md,
  },
  errorMessage: {
    marginTop: "12px",
    padding: "8px 12px",
    background: tokens.colors.errorBg,
    color: tokens.colors.error,
    borderRadius: tokens.radius.sm,
    fontSize: "0.875rem",
    fontWeight: 500,
  },
};

export default TaskItem;