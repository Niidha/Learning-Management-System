import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../axios";
import { createUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
// import "./css/update.css";

const UpdateUserProfile = () => {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data.user);
        dispatch(createUser(response.data.user));
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An error occurred while fetching user details"
        );
      }
    };

    fetchUserDetails();
  }, [userId, token, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.patch(`users/update/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="text-center mt-5 my-5">Update Profile</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="update-form">
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
      </div>
    </div>
  );
};

export default UpdateUserProfile;
