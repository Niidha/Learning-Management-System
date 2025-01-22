import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../css/details.css"; // Assuming you have a CSS file for styling
import { useSelector } from "react-redux";
import { api } from "../axios";

const UpdateUserProfile = () => {
  // Initialize form data with empty values
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
    age: "",
    qualification: "",
    preferredLanguage: "",
  });

  const [loading, setLoading] = useState(false);
  const { userId } = useSelector(
    (state) => state.user
  );
  // Assume the user ID is stored in localStorage or comes from the logged-in user context
  // const userId = localStorage.getItem("userId"); // This should be the correct user ID stored in localStorage

  // Fetch the current user details to show in the form (optional, if you want to show the existing values)
  useEffect(() => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`users/${userId}`, {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
          // },
        });
        setFormData(response.data.user); // Assuming response.data contains the user details
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred while fetching user details");
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation or state
    try {
      const response = await api.patch(`users/update/${userId}`, // Use userId in the URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message); // Display success message
      // Reset form data to empty values after successful submission
      setFormData({
        username: "",
        name: "",
        password: "",
        email: "",
        age: "",
        qualification: "",
        preferredLanguage: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setLoading(false); // End loading state
  };

  return (
    <div className="container">
      <h2 className="my-5">Update Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification</label>
          <input
            type="text"
            className="form-control"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="preferredLanguage">Preferred Language</label>
          <select
            className="form-control"
            id="preferredLanguage"
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            required
          >
            <option value="">Select Language</option>
            <option value="English (UK)">English (UK)</option>
            <option value="English (US)">English (US)</option>
            <option value="Indian">Indian</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserProfile;
