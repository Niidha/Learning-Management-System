import React, { useEffect, useState } from "react";
import { api } from "../axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUsersAndCourses = async () => {
      try {
        const usersResponse = await api.get("/students");
        setUsers(usersResponse.data.users || []); 
        const coursesResponse = await api.get("/users/courses");
        setCourses(coursesResponse.data.courses || []); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersAndCourses();
  }, []);

  return (
    <div style={pageStyles}>
      <h1 style={headingStyles}>Users</h1>
      <table style={tableStyles}>
        <thead>
          <tr style={tableHeaderStyles}>
            <th style={tableCellStyles}>Name</th>
            <th style={tableCellStyles}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index} style={tableRowStyles}>
                <td style={tableCellStyles}>{user.name}</td>
                <td style={tableCellStyles}>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={tableCellStyles}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      <h1 style={headingStyles}>Courses</h1>
      <ul style={courseListStyles}>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <li key={index} style={courseListItemStyles}>{course.title}</li>
          ))
        ) : (
          <li style={courseListItemStyles}>No courses available</li>
        )}
      </ul>
    </div>
  );
};

const pageStyles = {
  padding: "20px",
  fontFamily: "'Arial', sans-serif",
};

const headingStyles = {
  textAlign: "center",
  fontSize: "24px",
  marginBottom: "20px",
};

const tableStyles = {
  width: "200%",
  margin: "0 auto",
  borderCollapse: "collapse",
};

const tableHeaderStyles = {
  backgroundColor: "#007bff",
  color: "#fff",
  textAlign: "left",
  fontSize: "18px",
};

const tableCellStyles = {
  border: "1px solid #ddd",
  padding: "15px 25px",
  textAlign: "left",
  fontSize: "16px",
};

const tableRowStyles = {
  ":hover": {
    backgroundColor: "#f5f5f5",
  },
};

const courseListStyles = {
  listStyleType: "none",
  padding: 0,
  marginTop: "20px",
};

const courseListItemStyles = {
  padding: "10px",
  backgroundColor: "#f8f9fa",
  marginBottom: "8px",
  borderRadius: "5px",
  fontSize: "18px",
  textAlign: "center",
};

export default UsersPage;
