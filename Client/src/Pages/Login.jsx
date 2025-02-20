import React from 'react';
import { useFormik } from "formik";
import { api } from '../axios';
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { createUser } from '../Redux/userSlice';
import "../css/login.css";  

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                const { data } = await api.post("/users/login", values);
                
                const { userId, token, user } = data;

                // Store user details in Redux
                dispatch(createUser({
                    id: userId,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isAuthenticated: true, // Add authentication state
                }));

                // Store authentication details in localStorage
                localStorage.setItem("userId", userId);
                localStorage.setItem("access_token", token);
                localStorage.setItem("role", user.role);

                toast.success("Logged In");

                // Role-based navigation
                switch (user.role) {
                    case "admin":
                        navigate("/admin-dashboard");
                        break;
                    case "provider":
                        navigate("/provider-dashboard");
                        break;
                    case "student":
                    default:
                        navigate("/courses");
                        break;
                }
            } catch (err) {
                console.error(err.message);
                toast.error(err.response?.data?.message || "Login failed. Please try again.");
            }
        }
    });

    return (
        <div className="login-container">
            <form onSubmit={formik.handleSubmit} className="login-form">
                <h2 className="form-title">Login</h2>
                <input
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className="input-field"
                    type="text"
                    name="username"
                    placeholder="Enter username"
                />
                <input
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="input-field"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                />
                <button className="btn login-btn w-100" type="submit">Login</button>
                <button
                    className="btn signup-btn w-100"
                    type="button"
                    onClick={() => navigate('/signup')}
                >
                    Signup
                </button>
            </form>
        </div>
    );
}

export default Login;
