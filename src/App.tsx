import React from 'react';
import './App.css';
import { TaskProvider } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <TaskProvider>
      <div className="app-page">
        <div className="app-container">
          <header className="app-header">
            <h1 className="app-title">Task Manager</h1>
          </header>

          <div className="app-main">
            <div className="form-section">
              <TaskForm />
            </div>
            <div className="list-section">
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
