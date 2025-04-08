## Roles Definition and Permission:
### Admin
1. Manage users
2. Create/edit/delete courses, lessons, exams
3. View all enrollments

### Instructor

1. Create/edit/delete their own courses, lessons, exams
2. View students enrolled in their courses

### Student
1. View/enroll in courses
2. Access lessons and exams for enrolled courses

## Implementation Descriptions:
### Database:
The database user collections include a 'role' for each, which can be "instructor", "student", or "admin".
### Middleware:
An `authMiddleware.js` file is used to restrict access based on roles, using JWT.
