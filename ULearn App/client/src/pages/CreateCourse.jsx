import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateCourse.css";

axios.defaults.baseURL = "http://localhost:3000";

const CreateCourse = ({ user }) => {
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    description: "",
    category: "",
    instructor_id: "",
  });

  const [instructors, setInstructors] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch instructors on mount
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/instructor/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInstructors(res.data);

        // If the current user is an instructor, pre-select them
        if (user?.role === "instructor") {
          setFormData((prev) => ({ ...prev, instructor_id: user._id }));
        }
      } catch (err) {
        console.error("❌ Failed to fetch instructors:", err);
        setMessage("❌ Failed to load instructors.");
      }
    };

    fetchInstructors();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "/api/courses",
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("✅ Course created successfully!");
      setFormData({ _id: "", title: "", description: "", category: "", instructor_id: "" });
    } catch (error) {
      console.error("❌ Course creation failed:", error.response?.data || error.message);
      setMessage(
        `❌ ${error.response?.data?.message || "Failed to create course."}`
      );
    }
  };

  return (
    <div className="create-course-page">
      <h2>Create New Course</h2>
      {message && <p className="form-message">{message}</p>}

      <form className="create-course-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="_id"
          placeholder="Course ID (e.g. c101)"
          value={formData._id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Course Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <select
          name="instructor_id"
          value={formData.instructor_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor._id} value={instructor._id}>
              {instructor.name} ({instructor.email})
            </option>
          ))}
        </select>

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
