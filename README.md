# Task Manager – Full Stack TODO Application

A full-stack **Task Manager / TODO application** built with **Node.js, Express, and PostgreSQL**.  
The application allows users to manage daily tasks with **start time, end time, priority levels, and completion tracking**.

It also calculates the **remaining time for the current task** and identifies **upcoming tasks**, helping users manage their schedule effectively.

---

## Features

- Create new tasks
- Assign **start time and end time**
- Set **task priority**
- Mark tasks as **completed using checkbox**
- Filter tasks by completion status
- Automatically detect **current task**
- Show **remaining time for active task**
- Identify **upcoming tasks**
- Store tasks in **PostgreSQL database**

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Tools
- Git
- GitHub
- REST API

---

## Project Structure


project-root
│
├── backend
│   ├── db.js
│   ├── server.js
│   └── routes
│       └── tasks.js
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── package.json
└── README.md




---

## API Endpoints

### Get All Tasks
```

GET /tasks

```

### Get Tasks by Completion Status
```

GET /tasks?completed=true
GET /tasks?completed=false

```

### Create Task
```

POST /tasks

```

Example body:

```

{
"task": "Study React",
"start_time": "10:00",
"end_time": "12:00",
"priority": "High"
}

```

### Update Task
```

PUT /tasks/:id

```

### Delete Task
```

DELETE /tasks/:id
