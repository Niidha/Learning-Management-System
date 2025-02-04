import React from 'react';
import { useFormik } from "formik";
import { api } from '../axios';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createUser } from '../Redux/userSlice';
import * as Yup from 'yup';
import "../css/signup.css";  

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters")
            .max(50, "Name cannot be longer than 50 characters"),
        
        username: Yup.string()
            .required("Username is required")
            .min(3, "Username must be at least 3 characters")
            .max(30, "Username cannot be longer than 30 characters"),
        
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email format"),
        
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[a-zA-Z0-9]/, "Password can only contain letters and numbers"),
        
        confirm_password: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref('password'), null], "Passwords must match"),

        role: Yup.string()
            .required("Role selection is required")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            role: "student"
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { data } = await api.post("/users/signup", values);
                localStorage.setItem("access_token", data.token);
                dispatch(createUser(data.user));
                toast.success("Account Created");

                if (values.role === "admin") {
                    navigate("/admin-dashboard");
                } else if (values.role === "provider") {
                    navigate("/provider-dashboard");
                } else {
                    navigate("/courses");
                }
            } catch (err) {
                toast.error(err.response?.data.message || err.message);
            }
        },
        
        validateOnBlur: false,
        validateOnChange: false,
        validate: (values) => {
            const errors = {};
            validationSchema
                .validate(values, { abortEarly: false })
                .then(() => {})
                .catch((err) => {
                    err.inner.forEach((error) => {
                        errors[error.path] = error.message;
                        toast.error(error.message); 
                    });
                });
            return errors;
        }
    });

    return (
        <div className="signup-container">
            <form onSubmit={formik.handleSubmit} className="signup-form">
                <h2 className="form-title">Signup</h2>
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="input-field"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                />
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className="input-field"
                    type="text"
                    name="username"
                    placeholder="Enter username"
                />
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="input-field"
                    type="text"
                    name="email"
                    placeholder="Enter email"
                />
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="input-field"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                />
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm_password}
                    className="input-field"
                    type="password"
                    name="confirm_password"
                    placeholder="Re-enter password"
                />
                <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                    className="select-field"
                    name="role"
                >
                    <option value="student">Student</option>
                    <option value="provider">Provider</option>
                    <option value="admin">Admin</option>
                </select>

                <button className="signup-btn w-50" type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default Signup;
