# 5200OnlineLearning
📄 MongoDB Schema Design Overview – Online Learning Platform


Schema Design
1. users Collection
The users collection stores information about users in the platform. Users can be students, instructors, or admins.


_id: Unique user ID.
name: User's name.
email: User's email.
Password: User’s password
role: Role of the user (student, instructor, admin).
registered_at: Timestamp of when the user registered.

2. courses Collection
The courses collection stores details about courses. Each course has a reference to an instructor (instructor_id), which is linked to a record in the users collection.
_id: Unique course ID.
title: Title of the course.
description: Short description of the course.
instructor_id: Reference to the instructor in the users collection.
category: Category of the course (e.g., Programming, Data Science).
created_at: Timestamp when the course was created.

3. lessons Collection
The lessons collection represents individual lessons within a course. Each lesson is associated with a course (course_id), and the lessons are ordered by order_number.

_id: Unique lesson ID.
title: Title of the lesson.
content: Text content of the lesson.
course_id: Reference to the course in the courses collection.
order_number: The sequence number of the lesson within the course.
created_at: Timestamp when the lesson was created.

4. exams Collection
The exams collection stores exam details for each course. Each exam has multiple questions, each with options and a correct answer.

_id: Unique exam ID.
course_id: Reference to the course in the courses collection.
title: Title of the exam.
start_time: The start time of the exam.
duration_minutes: Duration of the exam in minutes.
questions: An array of questions, each with possible options and the correct answer.

5. enrollments Collection
The enrollments collection tracks which students are enrolled in which courses. It includes the enrollment status and the enrollment timestamp.

_id: Unique enrollment ID.
student_id: Reference to the student in the users collection.
course_id: Reference to the course in the courses collection.
enrolled_at: Timestamp when the student enrolled in the course.
status: Enrollment status (active, pending).

