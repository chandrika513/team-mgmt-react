import React from 'react';
import { TaskProvider } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { tokens } from "./styles/shared";

function App() {
  return (
    <TaskProvider>
      <div style={styles.page}>
        <div style={styles.container}>
          <header style={styles.header}>
            <h1 style={styles.title}>Task Manager</h1>
          </header>

          <div style={styles.main}>
            <div style={styles.formSection}>
              <TaskForm />
            </div>
            <div style={styles.listSection}>
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100%",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    overflow: "hidden",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    width: "100%",
  },
  header: {
    textAlign: "center",
    marginBottom: "16px",
    flexShrink: 0,
  },
  main: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    flex: 1,
    overflow: "hidden",
    gap: "12px",
  },
  formSection: {
    flexShrink: 0,
    padding: "0 4px",
  },
  listSection: {
    flex: 1,
    overflow: "hidden",
    padding: "0 4px 4px 4px",
    minHeight: 0,
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "2.25rem",
    fontWeight: 800,
    color: tokens.colors.text.primary,
    letterSpacing: "-1px",
  },
};

export default App;
