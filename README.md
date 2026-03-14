# Task Manager

A simple React app for managing tasks. Built with TypeScript and a clean CSS approach.

## What it does

- Add, edit, and delete tasks
- Set priority levels (low, medium, high)
- Track status (pending, in progress, done)
- Search tasks by title
- Tasks persist via backend API

## Running locally

```bash
npm install
npm start
```

The app runs on [http://localhost:3000](http://localhost:3000). You'll also need the backend running on port 8000.

## Project structure

```
src/
├── components/     # UI components (TaskForm, TaskList, TaskItem)
├── context/        # TaskContext for state management
├── api/            # API calls
├── types/          # TypeScript interfaces
└── *.css           # Component styles (no CSS-in-JS)
```


