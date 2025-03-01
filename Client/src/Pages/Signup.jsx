import React from "react";
import { useFormik } from "formik";
import { api } from "../axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createUser } from "../Redux/userSlice";
import * as Yup from "yup";
import "../css/signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters")
            .max(50, "Name cannot be longer than 50 characters")
            .matches(/^\S+$/, "Spaces are not allowed"),

        username: Yup.string()
            .required("Username is required")
            .min(3, "Username must be at least 3 characters")
            .max(30, "Username cannot be longer than 30 characters")
            .matches(/^\S+$/, "Spaces are not allowed"),

        email: Yup.string()
            .required("Email is required")
            .email("Invalid email format")
            .matches(/^\S+$/, "Spaces are not allowed"),

        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[a-zA-Z0-9]/, "Password can only contain letters and numbers")
            .matches(/^\S+$/, "Spaces are not allowed"),

        confirm_password: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .matches(/^\S+$/, "Spaces are not allowed"),

        role: Yup.string().required("Role selection is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            role: "student",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { data } = await api.post("/users/signup", values);

                localStorage.setItem("access_token", data.token);
                localStorage.setItem("userRole", data.user.role);
                dispatch(createUser(data.user));

                toast.success("Account Created Successfully!");

                switch (data.user.role) {
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
                toast.error(err.response?.data.message || "Signup failed. Please try again.");
            }
        },
    });

    const preventSpaces = (e) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={formik.handleSubmit} className="signup-form">
                <h2 className="form-title">Signup</h2>

                <input
                    onChange={(e) => formik.setFieldValue("name", e.target.value.trim())}
                    onKeyDown={preventSpaces}
                    value={formik.values.name}
                    className="input-field"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="error-message">{formik.errors.name}</div>
                )}

                <input
                    onChange={(e) => formik.setFieldValue("username", e.target.value.trim())}
                    onKeyDown={preventSpaces}
                    value={formik.values.username}
                    className="input-field"
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username && (
                    <div className="error-message">{formik.errors.username}</div>
                )}

                <input
                    onChange={(e) => formik.setFieldValue("email", e.target.value.trim())}
                    onKeyDown={preventSpaces}
                    value={formik.values.email}
                    className="input-field"
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="error-message">{formik.errors.email}</div>
                )}

                <input
                    onChange={(e) => formik.setFieldValue("password", e.target.value.trim())}
                    onKeyDown={preventSpaces}
                    value={formik.values.password}
                    className="input-field"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="error-message">{formik.errors.password}</div>
                )}

                <input
                    onChange={(e) => formik.setFieldValue("confirm_password", e.target.value.trim())}
                    onKeyDown={preventSpaces}
                    value={formik.values.confirm_password}
                    className="input-field"
                    type="password"
                    name="confirm_password"
                    placeholder="Re-enter password"
                    onBlur={formik.handleBlur}
                />
                {formik.touched.confirm_password && formik.errors.confirm_password && (
                    <div className="error-message">{formik.errors.confirm_password}</div>
                )}

                <select
                    onChange={formik.handleChange}
                    value={formik.values.role}
                    className="select-field"
                    name="role"
                    onBlur={formik.handleBlur}
                >
                    <option value="student">Student</option>
                    <option value="provider">Provider</option>
                    <option value="admin">Admin</option>
                </select>
                {formik.touched.role && formik.errors.role && (
                    <div className="error-message">{formik.errors.role}</div>
                )}

                <button className="signup-btn" type="submit">
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default Signup;
