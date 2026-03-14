import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { Task } from "../tasksdata/task";
import { useRef, useEffect, useState, useMemo } from "react";
import { inputBase, tokens } from "../styles/shared";

const TaskList = () => {
  const { tasks } = useTasks();
  const prevCountRef = useRef(tasks.length);
  const [newTaskId, setNewTaskId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Simple filter without debounce
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
    <div style={styles.container}>
      
      <div style={styles.sectionHeader}>
        <span style={styles.heading}>Your Tasks</span>
        <span style={styles.count}>{filteredTasks.length}</span>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.scrollArea}>
        {filteredTasks.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyTitle}>{searchQuery ? "No tasks found" : "No tasks yet"}</p>
          </div>
        ) : (
          <div style={styles.list}>
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
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
    padding: "0 8px",
    flexShrink: 0,
  },
  searchContainer: {
    marginBottom: "12px",
    padding: "0 8px",
  },
  searchInput: {
    ...inputBase,
    width: "100%",
    boxSizing: "border-box",
  },
  heading: {
    color: tokens.colors.text.secondary,
    fontSize: "1rem",
    fontWeight: 600,
  },
  count: {
    marginLeft: "auto",
    padding: "4px 12px",
    background: "rgba(255,255,255,0.6)",
    borderRadius: "20px",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: tokens.colors.text.muted,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingBottom: "20px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    background: "rgba(255,255,255,0.4)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    border: "2px dashed rgba(139, 92, 246, 0.2)",
  },
  emptyTitle: {
    margin: 0,
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "#4b5563",
  },
};

export default TaskList;