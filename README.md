# 📚 5200 Online Learning Platform

This project is a web-based **online learning system** powered by **MongoDB**. It demonstrates document-oriented database modeling, RESTful API design, and user-role based access control. Built for CS5200 Practicum 2.

---

## 🚀 Features

- 🧑‍🏫 Instructor-student-admin user roles
- 📘 Course and lesson management
- 📝 Exams with nested questions
- ✅ Enrollment system with ACID-compliant transactions
- 🔒 JWT-based secure authentication
- 📊 Ready for future dashboard & visualization
- 📂 Assignment creation and management
- 📝 Submission system with grading and feedback

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Others**: dotenv, body-parser, etc.

---

## 📁 Folder Structure

```
/project-root
├── backend/
│   ├── models/            # Mongoose schema definitions
│   ├── routes/            # API route handlers
│   ├── controllers/       # CRUD and logic
│   ├── middleware/        # Authentication middleware
│   ├── data/              # Sample JSON data (users, courses, etc.)
│   └── server.js          # Main entry point
├── frontend/              # (Optional) simple UI for demo/testing
├── README.md              # This file
└── documentation.pdf      # PDF report (schema, samples, diagrams)
```

---

## 🛠️ Setup & Run

1. **Clone the repo**

```bash
git clone https://github.com/lavieboheme2018/5200OnlineLearning.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env` file:

```bash
MONGODB_URI=mongodb://localhost:27017/onlinelearning
JWT_SECRET=My$3cureJWT!Key#2025
```

4. **Install additional dependencies**

```bash
npm install dotenv
npm install express
npm install mongoose
npm install bcryptjs
npm install jsonwebtoken
```

5. **Run the server**

```bash
node App.js
```

6. **Authentication Setup**

- Ensure the following files are present in the `backend/` directory:
  - `models/User.js`: Defines the user schema with hashed passwords.
  - `routes/auth.js`: Handles user signup and login endpoints.
  - `middleware/auth.js`: Middleware for JWT verification and role-based access control.
- Protect routes by adding the `auth` middleware to routes requiring authentication.

Server should start on `http://localhost:3000`

---

7. **Run the frontend**
```bash
cd client
npm install
npm start
```

## 📦 Sample Data

Sample `.json` files are available under `dataSamples/` and can be imported into MongoDB.

---

## 📑 API Endpoints and CRUD Explanations

### **Authentication**

- **POST /api/auth/signup**: Register a new user (requires `name`, `email`, `password`, and `role`).
- **POST /api/auth/login**: Log in an existing user and receive a JWT.

### **Users**

- **GET /api/users**: Retrieve all users (Admin only).
- **GET /api/users/:id**: Retrieve a specific user by ID.
- **PUT /api/users/:id**: Update user details (Admin or the user themselves).
- **DELETE /api/users/:id**: Delete a user (Admin only).

### **Courses**

- **POST /api/courses**: Create a new course (Instructors or Admin only).
- **GET /api/courses**: Retrieve all courses.
- **GET /api/courses/:id**: Retrieve a specific course by ID.
- **PUT /api/courses/:id**: Update course details (Instructors or Admin only).
- **DELETE /api/courses/:id**: Delete a course (Admin only).

### **Lessons**

- **POST /api/lessons**: Create a new lesson (Instructors or Admin only).
- **GET /api/lessons**: Retrieve all lessons.
- **GET /api/lessons/:id**: Retrieve a specific lesson by ID.
- **PUT /api/lessons/:id**: Update lesson details (Instructors or Admin only).
- **DELETE /api/lessons/:id**: Delete a lesson (Admin only).

### **Exams**

- **POST /api/exams**: Create a new exam (Instructors or Admin only).
- **GET /api/exams**: Retrieve all exams.
- **GET /api/exams/:id**: Retrieve a specific exam by ID.
- **PUT /api/exams/:id**: Update exam details (Instructors or Admin only).
- **DELETE /api/exams/:id**: Delete an exam (Admin only).

### **Assignments**

- **POST /api/assignments**: Create a new assignment (Instructors or Admin only).
- **GET /api/assignments**: Retrieve all assignments.
- **GET /api/assignments/:id**: Retrieve a specific assignment by ID.
- **PUT /api/assignments/:id**: Update assignment details (Instructors or Admin only).
- **DELETE /api/assignments/:id**: Delete an assignment (Admin only).

### **Submissions**

- **POST /api/submissions**: Submit an assignment (Students only).
- **GET /api/submissions**: Retrieve all submissions (Instructors or Admin only).
- **GET /api/submissions/:id**: Retrieve a specific submission by ID.
- **PUT /api/submissions/:id/grade**: Grade a submission (Instructors or Admin only).

---

## 📑 Complex Aggregation Queries

This project implements **5 complex aggregation queries** using MongoDB's aggregation framework. These queries provide valuable insights into the platform's data and are optimized for performance.

### **1. Get Student Counts for Each Course**

- **Description**: Counts the number of students enrolled in each course and sorts the results in descending order of student count.
- **Endpoint**: `GET /api/courses/student-counts`
- **Access**: Admins and instructors only.
- **Example Response**:
  ```json
  [
    {
      "courseId": "course123",
      "courseTitle": "Introduction to Programming",
      "studentCount": 50
    },
    {
      "courseId": "course456",
      "courseTitle": "Advanced Databases",
      "studentCount": 30
    }
  ]
  ```

---

### **2. Get Course Counts for Each Instructor**

- **Description**: Counts the number of courses created by each instructor and sorts the results in descending order of course count.
- **Endpoint**: `GET /api/users/instructor-course-counts`
- **Access**: Admins only.
- **Example Response**:
  ```json
  [
    {
      "instructorId": "instructor123",
      "instructorName": "John Doe",
      "courseCount": 5
    },
    {
      "instructorId": "instructor456",
      "instructorName": "Jane Smith",
      "courseCount": 3
    }
  ]
  ```

---

### **3. Get Average Grades for Each Course**

- **Description**: Calculates the average grade for each course based on student submissions and rounds the result to 2 decimal places.
- **Endpoint**: `GET /api/courses/average-grades`
- **Access**: Admins and instructors only.
- **Example Response**:
  ```json
  [
    {
      "courseId": "course123",
      "courseTitle": "Introduction to Programming",
      "averageGrade": 85.5
    },
    {
      "courseId": "course456",
      "courseTitle": "Advanced Databases",
      "averageGrade": 90.2
    }
  ]
  ```

---

### **4. Get Submission Counts for Each Student**

- **Description**: Counts the number of submissions made by each student and sorts the results in descending order of submission count.
- **Endpoint**: `GET /api/submissions/student-submission-counts`
- **Access**: Admins and instructors only.
- **Example Response**:
  ```json
  [
    {
      "studentId": "student123",
      "studentName": "Alice Johnson",
      "submissionCount": 10
    },
    {
      "studentId": "student456",
      "studentName": "Bob Brown",
      "submissionCount": 8
    }
  ]
  ```

---

### **5. Get Assignment Counts for Each Course**

- **Description**: Counts the number of assignments for each course and sorts the results in descending order of assignment count.
- **Endpoint**: `GET /api/assignments/course-assignment-counts`
- **Access**: Admins and instructors only.
- **Example Response**:
  ```json
  [
    {
      "courseId": "course123",
      "courseTitle": "Introduction to Programming",
      "assignmentCount": 5
    },
    {
      "courseId": "course456",
      "courseTitle": "Advanced Databases",
      "assignmentCount": 3
    }
  ]
  ```

---

## 🛠️ How to Create a User

### 1. Use the `POST /api/auth/signup` Endpoint

- To create a new user, use the `POST /api/auth/signup` endpoint.
- **NOTE**: Set role to "admin" if you want to get access to all the endpoints.
- Example request body:
  ```json
  {
    "name": "Alice Smith",
    "email": "alicesmith@example.com",
    "password": "securepassword123",
    "role": "admin"
  }
  ```
- **Roles**:

  - `admin`: Full access to all resources.
  - `instructor`: Can manage courses, lessons, and assignments.
  - `student`: Can enroll in courses, submit assignments, and take exams.

- Example response:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

---

## 🔑 How to Test Authentication in Postman

### 1. Log In to Get a Token

- Use the `POST /api/auth/login` endpoint to log in with valid credentials.
- Example request body:
  ```json
  {
    "email": "alicesmith@example.com",
    "password": "securepassword123"
  }
  ```
- The server will respond with a token. Example response:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQyYjYzYzE2YzQyMDAxNzYzYzE2ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4MDg5NjAwMCwiZXhwIjoxNjgwOTgyNDAwfQ.abc123xyz456"
  }
  ```

### 2. Set the Authorization Header

- In Postman, create a new request for a protected endpoint (e.g., `GET /api/users`).
- Go to the **Headers** tab and add the following header:
  - **Key**: `Authorization`
  - **Value**: `Bearer <your_token>`
- **Important**: Ensure there is a **space** between `Bearer` and `<your_token>`.
- Replace `<your_token>` with the actual token you received from the login response.

### 3. Send the Request

- Click the **Send** button to make the request.
- If the token is valid and the user has the required permissions, you should receive a successful response (e.g., HTTP status `200 OK`).

---

## 📬 Contact

CS5200 Group — 2025 Spring | Northeastern University
