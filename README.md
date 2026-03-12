# Task Manager -- Full Stack TODO Application

A full-stack **Task Manager / TODO application** built with **Node.js,
Express, and PostgreSQL**. The application allows users to manage daily
tasks with start time, end time, priority levels, and completion
tracking.

It can also calculate the **remaining time for the current task** and
identify **upcoming tasks**.

------------------------------------------------------------------------

## Features

-   Create new tasks
-   Assign start time and end time
-   Set task priority
-   Mark tasks as completed using checkbox
-   Filter tasks by completion status
-   Detect current active task
-   Show remaining time for active task
-   Identify upcoming tasks
-   Store tasks in PostgreSQL database

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   HTML
-   CSS
-   JavaScript

### Backend

-   Node.js
-   Express.js

### Database

-   PostgreSQL

### Tools

-   Git
-   GitHub
-   REST API

------------------------------------------------------------------------

## Project Structure

    project-root
    â
    âââ backend
    â   âââ db.js
    â   âââ server.js
    â   âââ routes
    â       âââ tasks.js
    â
    âââ frontend
    â   âââ index.html
    â   âââ style.css
    â   âââ script.js
    â
    âââ package.json
    âââ README.md

------------------------------------------------------------------------

## API Endpoints

### Get All Tasks

GET /tasks

### Get Tasks by Completion Status

GET /tasks?completed=true\
GET /tasks?completed=false

### Create Task

POST /tasks

Example body:

{ "task": "Study React", "start_time": "10:00", "end_time": "12:00",
"priority": "High" }

### Update Task

PUT /tasks/:id

### Delete Task

DELETE /tasks/:id

------------------------------------------------------------------------

## Database Schema

``` sql
CREATE TABLE taskmanager (
  id SERIAL PRIMARY KEY,
  task TEXT NOT NULL,
  start_time TIME,
  end_time TIME,
  priority VARCHAR(20),
  completed BOOLEAN DEFAULT FALSE,
  date DATE DEFAULT CURRENT_DATE
);
```

------------------------------------------------------------------------

## Installation

### 1. Clone Repository

git clone https://github.com/yourusername/task-manager.git

### 2. Install Dependencies

npm install

### 3. Setup PostgreSQL

CREATE DATABASE taskmanager;

Update database configuration inside **db.js**.

### 4. Run Server

node server.js

Server runs on:

http://localhost:5000

------------------------------------------------------------------------

## Future Improvements

-   React or React Native frontend
-   Authentication system
-   Task reminders
-   Mobile responsive UI
-   Dashboard analytics

------------------------------------------------------------------------

## Author

Anupam Pandey\
https://github.com/anupampandey28

------------------------------------------------------------------------

## License

MIT License
