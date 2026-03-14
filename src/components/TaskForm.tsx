import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { Priority, Status } from "../tasksdata/task";
import { buttonBase, inputBase, cardBase, flex, tokens } from "../styles/shared";

const TaskForm = () => {
  const { addTask, updateTask, editingTask, cancelEditing } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const [status, setStatus] = useState<Status>("pending");

  // Populate form when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority);
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setDescription("");
      setPriority("low");
      setStatus("pending");
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() ) {
      alert("Title is required!");
      return;
    }
    
    if (editingTask) {
      // Edit mode
      await updateTask(editingTask.id, { title, description, priority, status });
    } else {
      // Create mode
      await addTask({ title, description, priority, status });
      setTitle("");
      setDescription("");
      setPriority("low");
      setStatus("pending");
    }
  };

  const handleCancel = () => {
    cancelEditing();
  };

  const isEditing = !!editingTask;

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.row}>
        <input
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ ...styles.input, flex: 2 }}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.input, flex: 1.5 }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          style={styles.select}
        >
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          style={styles.select}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Completed</option>
        </select>
        <button type="submit" style={styles.button}>
          <span style={styles.buttonText}>{isEditing ? "Update" : "Add"}</span>
        </button>
        {isEditing && (
          <button type="button" onClick={handleCancel} style={styles.cancelBtn}>
            <span style={styles.buttonText}>Cancel</span>
          </button>
        )}
      </div>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: {
    ...cardBase,
    padding: "12px 16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  },
  row: {
    ...flex.row,
    gap: "10px",
  },
  input: {
    ...inputBase,
    flex: 2,
  },
  select: {
    ...inputBase,
    padding: "10px 12px",
    cursor: "pointer",
  },
  button: {
    ...buttonBase,
    background: tokens.colors.purple,
    color: tokens.colors.white,
    boxShadow: tokens.shadows.purple,
  },
  cancelBtn: {
    ...buttonBase,
    background: "#f3f4f6",
    color: tokens.colors.text.secondary,
    boxShadow: tokens.shadows.lg,
  },
  buttonText: {
    letterSpacing: "0.3px",
  },
};

export default TaskForm;