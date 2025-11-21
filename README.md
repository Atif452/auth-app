🔐 Login & Signup Authentication System

A full-stack authentication web application built using React.js (Vite), Node.js, Express, and MySQL. This project features a modern, responsive UI with a secure backend for handling user registration and login functionality.

🚀 Tech Stack

Frontend

React.js (Vite)

Vanilla CSS (Styled Components approach)

Lucide React (Icons)

Backend

Node.js

Express.js (REST API)

MySQL2 (Database Connection)

CORS (Cross-Origin Resource Sharing)

📂 Project Structure

my-auth-app/
├── client/            # React Frontend
│   ├── src/
│   │   ├── App.jsx    # Main UI & Logic
│   │   └── main.jsx
│   └── package.json
│
├── server/            # Node Backend
│   ├── db.js          # Database Connection
│   ├── server.js      # API Routes (Login/Register)
│   └── package.json
│
└── README.md          # Project Documentation


⚙️ Prerequisites

Before running this project, ensure you have the following installed:

Node.js (v14 or higher)

XAMPP (or any MySQL Environment)

🗄️ Database Setup (MySQL)

Open phpMyAdmin (http://localhost/phpmyadmin).

Click on SQL tab or create a new database named auth_db.

Run the following SQL command to create the required table:

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS auth_db;

-- 2. Select Database
USE auth_db;

-- 3. Create Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


Note: By default, the app assumes root user with no password. If you have a password set for MySQL, update it in server/db.js.

🛠️ Installation & Setup Guide

Follow these steps to run the project locally.

1. Backend Setup (Server)

Open a terminal and navigate to the server folder:

cd server

# Install dependencies
npm install

# Start the server
node server.js


The terminal should display: Server is running on port 8081 & Connected to MySQL database.

2. Frontend Setup (Client)

Open a new terminal and navigate to the client folder:

cd client

# Install dependencies
npm install

# Run the React App
npm run dev


Open the local link provided by Vite (e.g., http://localhost:5173) in your browser.

🔌 API Endpoints

Method

Endpoint

Description

Body Parameters

POST

/register

Register a new user

name, email, password

POST

/login

Login existing user

email, password

🐛 Troubleshooting

CORS Error: Ensure the backend is running on port 8081 and the frontend fetch calls point to http://localhost:8081.

Database Connection Failed: Check if XAMPP (MySQL) is running and verify credentials in server/db.js.

Module Not Found: Run npm install in both client and server folders separately.

