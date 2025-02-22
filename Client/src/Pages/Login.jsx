import React from "react";
import { useFormik } from "formik";
import { api } from "../axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createUser } from "../Redux/userSlice";
import "../css/login.css";  

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            try {
                const { data } = await api.post("/users/login", values);
                
                const { user, token } = data; 

                if (!user || !user._id) {
                    throw new Error("Invalid user data received");
                }

                dispatch(createUser({
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isAuthenticated: true,
                }));

                
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("access_token", token);
                console.log("Stored token:", token);


                toast.success("Logged In Successfully!");

                if (user.role === "admin") {
                    navigate("/admin-dashboard");
                } else if (user.role === "provider") {
                    navigate("/provider-dashboard");
                } else {
                    navigate("/courses");
                }
            } catch (err) {
                console.error("Login error:", err);
                toast.error(err.response?.data?.message || "Login failed. Please try again.");
            }
        },
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
                    required
                />
                <input
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="input-field"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
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
