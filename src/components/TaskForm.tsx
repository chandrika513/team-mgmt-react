import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { Priority, Status } from "../types/task";
import "./TaskForm.css";

export default function TaskForm() {
  const { addTask, updateTask, editingTask, cancelEditing } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const [status, setStatus] = useState<Status>("pending");

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
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }
    
    if (editingTask) {
      await updateTask(editingTask.id, { title, description, priority, status });
    } else {
      await addTask({ title, description, priority, status });
      setTitle("");
      setDescription("");
      setPriority("low");
      setStatus("pending");
    }
  };

  const isEditing = !!editingTask;

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
        <input
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          style={{ flex: 2 }}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          style={{ flex: 1.5 }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="form-select"
        >
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          className="form-select"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Completed</option>
        </select>
        <button type="submit" className="form-btn">
          {isEditing ? "Update" : "Add"}
        </button>
        {isEditing && (
          <button type="button" onClick={cancelEditing} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}