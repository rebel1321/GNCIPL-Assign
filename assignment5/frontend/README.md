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

## Enhanced Backend API

The backend now supports the following task fields:
- `description` (string, required) - Task description
- `isCompleted` (boolean, default: false) - Completion status
- `dueDate` (Date, optional) - When the task is due
- `createdAt` (Date, auto-generated) - When task was created
- `updatedAt` (Date, auto-generated) - When task was last modified

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

### Example API Payloads

**Creating a task with due date:**
```json
{
  "description": "Complete project documentation",
  "dueDate": "2025-09-25"
}
```

**Updating task completion:**
```json
{
  "isCompleted": true
}
```

**Updating task with new due date:**
```json
{
  "description": "Updated task description",
  "dueDate": "2025-09-30"
}
```

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

## Design Theme

The application features a stunning **blue and black gradient background** throughout:
- Primary gradient: `from-blue-900 via-blue-800 to-black`
- Glassmorphism effects with backdrop blur
- Smooth transitions and hover effects
- Consistent color scheme with blue accents
- Enhanced visual feedback for task states

## Contributing

1. Follow the existing code style and conventions
2. Maintain the blue and black gradient theme
3. Ensure responsive design for all new components
4. Add proper error handling and loading states
5. Test on multiple screen sizes
6. Include visual indicators for new task states

## License

This project is part of the GNCIPL Assignment series.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
