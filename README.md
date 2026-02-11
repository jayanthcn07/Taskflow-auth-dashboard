# 🚀 TaskFlow – Scalable Authentication Dashboard

A modern full-stack web application featuring secure authentication, protected dashboard, and task management with a clean SaaS-style UI.

Built with scalability, modular architecture, and production-readiness in mind.

---

# 📌 Project Overview

TaskFlow is a scalable web application that includes:

- User authentication using JWT
- Protected dashboard
- CRUD operations on tasks
- Search and filter functionality
- Modern, responsive SaaS-style UI
- Secure backend architecture

The frontend and backend are fully decoupled and communicate via REST APIs.

---

# 🏗️ Architecture

Frontend (React)  
⬇ REST API  
Backend (Node.js + Express)  
⬇  
MongoDB Atlas

Authentication is handled via JWT (stateless authentication).

---

# ✨ Features

## 🔐 Authentication
- User Registration
- User Login
- JWT-based authentication
- Password hashing using bcrypt
- Protected frontend routes
- Protected backend routes
- Logout flow

## 📊 Dashboard
- Display logged-in user profile
- Task statistics (Total / Completed / Pending)
- Create tasks
- Update task status
- Delete tasks
- Search tasks
- Filter tasks by status
- Toast notifications
- Dark / Light mode toggle
- Modern SaaS-style layout

## 🔎 Search & Filtering
- Real-time search using query parameters
- Status-based filtering (pending / completed)
- Backend-level filtering logic

---

# 🛠️ Tech Stack

## Frontend
- React (Vite)
- React Router
- Axios
- Modern CSS (custom SaaS-style design system)

## Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- bcrypt for password hashing

---

# 🔒 Security Practices

- Passwords are hashed using bcrypt before storage
- JWT tokens are signed using a secret key
- JWT middleware protects private routes
- Environment variables used for:
  - MongoDB URI
  - JWT Secret
- Backend validation for all required fields

---

# 📚 API Documentation

## Base URL

http://localhost:5000/api


All protected routes require a JWT token in the Authorization header:

Authorization: Bearer <token>


---

# 🔐 Authentication Endpoints

---

## Register User

**POST** `/auth/register`

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
Success Response (201)
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
Error Responses
400 → Validation error (missing fields)

400 → User already exists

Login User
POST /auth/login

Request Body
{
  "email": "john@example.com",
  "password": "123456"
}
Success Response (200)
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
Error Responses
401 → Invalid credentials

Get Current User Profile
GET /auth/me

Headers
Authorization: Bearer <token>
Success Response (200)
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
Error Responses
401 → Unauthorized (missing/invalid token)

📝 Task Endpoints
Get All Tasks
GET /tasks


Success Response (200)
[
  {
    "_id": "task_id",
    "title": "Design UI",
    "status": "pending",
    "createdAt": "timestamp"
  }
]
Create Task
POST /tasks

Headers
Authorization: Bearer <token>
Request Body
{
  "title": "New Task"
}
Success Response (201)
{
  "_id": "task_id",
  "title": "New Task",
  "status": "pending"
}
Update Task
PUT /tasks/:id

Headers
Authorization: Bearer <token>
Request Body
{
  "status": "completed"
}
Success Response (200)
{
  "_id": "task_id",
  "title": "New Task",
  "status": "completed"
}
Delete Task
DELETE /tasks/:id

Headers
Authorization: Bearer <token>
Success Response (200)
{
  "message": "Task deleted"
}
<<<<<<< HEAD
```
=======

>>>>>>> 034e00f (deployement changes)

🔒 Authentication Flow Summary:

User registers or logs in

Backend returns a JWT token

Token is stored on frontend

Token is sent in Authorization header

Backend middleware validates token before allowing access

⚙️ API Design Notes:

RESTful architecture

Stateless authentication using JWT

User-specific task isolation

Query-based search and filtering

Structured JSON responses





