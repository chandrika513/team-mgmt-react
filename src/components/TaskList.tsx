import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { Task } from "../types/task";
import { useRef, useEffect, useState, useMemo } from "react";
import "./TaskList.css";

export default function TaskList() {
  const { tasks } = useTasks();
  const prevCountRef = useRef(tasks.length);
  const [newTaskId, setNewTaskId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = useMemo(() => {
    if (!searchQuery) return tasks;
    return tasks.filter((task: Task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  useEffect(() => {
    if (tasks.length > prevCountRef.current) {
      setNewTaskId(tasks[0].id);
      const timer = setTimeout(() => setNewTaskId(null), 500);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = tasks.length;
  }, [tasks]);

  return (
    <div className="task-list-container">
      <div className="section-header">
        <span className="section-heading">Your Tasks</span>
        <span className="task-count">{filteredTasks.length}</span>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="scroll-area">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p className="empty-title">{searchQuery ? "No tasks found" : "No tasks yet"}</p>
          </div>
        ) : (
          <div className="task-list">
            {filteredTasks.map((task: Task, index: number) => (
              <div 
                key={task.id} 
                className={task.id === newTaskId ? "new-task" : "task-card"}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TaskItem task={task} isNew={task.id === newTaskId} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}