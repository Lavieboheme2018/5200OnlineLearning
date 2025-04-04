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

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)(tbd
- **Others**: dotenv, body-parser, etc.(tbd

---

## 📁 Folder Structure

```
/project-root
├── backend/
│   ├── models/            # Mongoose schema definitions
│   ├── routes/            # API route handlers
│   ├── controllers/       # CRUD and logic
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
cd 5200OnlineLearning/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file:
```bash
MONGODB_URI=mongodb://localhost:27017/onlinelearning
JWT_SECRET=your_jwt_secret
```

4. **Run the server**
```bash
node server.js
```

5. **dependencies**
```bash
npm install dotenv
npm install express
npm install mongoose
```

Server should start on `http://localhost:3000`

---

## 📦 Sample Data

Sample `.json` files are available under `dataSamples/` and can be imported into MongoDB 
---


## 📄 License

MIT License

---

## 📬 Contact

CS5200 Group — 2025 Spring | Northeastern University
