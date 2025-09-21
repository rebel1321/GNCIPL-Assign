# Task Manager Frontend

A beautiful and responsive React frontend for the Task Manager application with a stunning blue and black gradient theme. Now featuring **task completion status** and **due dates**!

## ✨ New Features

- ✅ **Task Completion**: Mark tasks as completed with visual checkboxes
- 📅 **Due Dates**: Set optional due dates for tasks
- � **Smart Filtering**: Filter tasks by status (All, Pending, Completed, Overdue, Due Today)
- 🔄 **Advanced Sorting**: Sort by creation date, due date, description, or status
- 🚨 **Visual Indicators**: Color-coded tasks for different states:
  - 🟢 **Completed**: Green border and strikethrough text
  - 🔴 **Overdue**: Red border for overdue incomplete tasks
  - 🟡 **Due Today**: Yellow border for tasks due today
  - 🔵 **Normal**: Blue border for regular pending tasks

## Features

- �🎨 **Beautiful UI/UX**: Modern glassmorphism design with blue and black gradients
- 🔐 **Authentication**: User registration, login, and protected routes
- ✅ **Complete Task Management**: Create, read, update, delete, and mark tasks as complete
- 📱 **Responsive Design**: Works perfectly on all screen sizes
- 🔄 **Real-time Updates**: Instant feedback with loading states and animations
- 🎯 **User-friendly**: Intuitive interface with smooth transitions

## Technology Stack

- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and development server



## Task Features

### ✅ Completion Status
- Click the checkbox next to any task to toggle completion
- Completed tasks show with strikethrough text and green indicators
- Visual feedback when marking tasks as complete/incomplete

### 📅 Due Dates
- Add optional due dates when creating new tasks
- Edit due dates when updating existing tasks
- Visual indicators for overdue and due-today tasks
- Smart date formatting and validation

### 🎯 Filtering & Sorting
- **Filter Options**:
  - All Tasks: Show everything
  - Pending: Only incomplete tasks
  - Completed: Only finished tasks
  - Overdue: Incomplete tasks past their due date
  - Due Today: Tasks due today

- **Sort Options**:
  - Date Created: Newest first (default)
  - Due Date: Earliest due date first
  - Description: Alphabetical order
  - Status: Completed tasks first

### 🎨 Visual Enhancements
- Color-coded task cards based on status
- Hover effects and smooth transitions
- Status badges showing "Completed" or "Pending"
- Clear visual hierarchy with proper spacing

## API Integration

The frontend integrates with enhanced backend endpoints:

### Task Management Endpoints
- `GET /api/task` - Get all user tasks (with completion status and due dates)
- `POST /api/task` - Create new task (supports `description` and optional `dueDate`)
- `PUT /api/task/:id` - Update task (supports `description`, `isCompleted`, `dueDate`)
- `DELETE /api/task/:id` - Delete task


## Getting Started

### Prerequisites
- Node.js (v20.19.0 or later)
- npm or yarn
- Backend server running on port 5000

### Installation

1. Navigate to the frontend directory:
```bash
cd assignment5/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173` (or `http://localhost:5174` if 5173 is occupied)

### Environment Setup

Make sure the backend server is running on `http://localhost:5000` before starting the frontend.

## Usage Guide

### Creating Tasks
1. Enter task description in the input field
2. Optionally select a due date
3. Click "Add Task" to create

### Managing Tasks
- **Complete/Uncomplete**: Click the checkbox next to any task
- **Edit**: Click the "Edit" button to modify description and due date
- **Delete**: Click the "Delete" button to remove permanently

### Filtering and Organizing
- Use the **Filter** dropdown to show specific task types
- Use the **Sort by** dropdown to organize your task list
- The counter shows how many tasks match your current filter

### Visual Indicators
- **Green cards**: Completed tasks
- **Red cards**: Overdue incomplete tasks
- **Yellow cards**: Tasks due today
- **Blue cards**: Regular pending tasks



