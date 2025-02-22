import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../axios";
import { createUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";

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
    let storedUser = JSON.parse(localStorage.getItem("user"));
    if (!userId && storedUser) {
      dispatch(createUser(storedUser)); // Restore user in Redux
    }

    if (!userId && !storedUser) {
      toast.error("User not logged in");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`users/${storedUser?.id || userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData((prevState) => ({
          ...prevState,
          username: response.data.user?.username || "",
          name: response.data.user?.name || "",
          email: response.data.user?.email || "",
          age: response.data.user?.age || "",
          qualification: response.data.user?.qualification || "",
          preferredLanguage: response.data.user?.preferredLanguage || "",
        }));

        dispatch(createUser(response.data.user)); // Store user details in Redux
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
  
    // Filter out empty fields so they don't get sent as `""`
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );
  
    try {
      const response = await api.patch(`users/update/${userId}`, filteredData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      toast.success(response.data.message);
  
      // Update Redux & local storage
      dispatch(createUser(response.data.updatedUser));
      localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
  
      // Navigate to Courses Page
      navigate("/courses");
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
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password (Leave blank to keep unchanged)</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
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
