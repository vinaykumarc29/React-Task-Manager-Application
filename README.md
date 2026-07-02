# Task Manager Dashboard

## Overview

Task Manager Dashboard is a modern and responsive React application that helps users organize, manage, and track their daily tasks efficiently. The application provides authentication, task management, search, filtering, dynamic dashboard statistics, and persistent cloud storage using Supabase.


---

# Features

### User Authentication

* User Registration
* User Login
* Secure Logout
* Protected Routes
* Session Persistence using Supabase Authentication

---

### Dashboard

The dashboard provides an overview of the user's tasks.

It displays:

* Total Tasks
* Completed Tasks
* Pending Tasks
* Recently Added Tasks

All statistics update automatically whenever tasks are added, updated, or deleted.

---

### Task Management

Users can:

* Create a new task
* Delete a task
* Change task status
* Change task priority

Each task contains:

* Title
* Priority
* Status

---

### Search

Users can search tasks by title.

The task list updates instantly while typing.

---

### Filtering

Tasks can be filtered by:

* All Tasks
* Pending Tasks
* Completed Tasks

---

### Automatic Sorting

Tasks are automatically sorted using the following order:

1. Pending Tasks
2. Completed Tasks

Within each status:

1. High Priority
2. Medium Priority
3. Low Priority

---

### Cloud Database

Task data is stored in **Supabase**.

Each authenticated user can access only their own tasks.

Operations supported:

* Create
* Read
* Update
* Delete

---


# Folder Structure

```text
src
│
├── components
│   ├── Navbar
│   ├── TaskItem
│   ├── Loader
│   ├── ProtectedRoute
│   └── EmptyState
│
├── context
│   ├── AuthContext
│   ├── AuthProvider
│   ├── TaskContext
│   └── TaskProvider
│
├── hooks
│   ├── useAuth
│   └── useTask
│
├── pages
│   ├── Dashboard
│   ├── Tasks
│   ├── TaskForm
│   ├── Login
│   └── Register
│
├── service
│   └── supabase.js
│
├── App.jsx
└── main.jsx
```

### Auth Context

Responsible for:

* User Authentication
* Login
* Logout
* Current User
* Authentication Loading State

### Task Context

Responsible for:

* Fetching Tasks
* Adding Tasks
* Updating Tasks
* Deleting Tasks
* Sorting Tasks
* Task Loading State

---


# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd task-manager
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Start the development server:

```bash
npm run dev
```

---

# Author

**Vinay Kumar C**
