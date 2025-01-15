import React from 'react'
import { useFormik } from "formik"
import { api } from '../axios'
import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux"
import toast from 'react-hot-toast'
import { createUser } from '../Redux/userSlice'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                const { data } = await api.post("/users/login", values);
                
                const { userId, token } = data;

                localStorage.setItem("userId", userId); // Store userId
                localStorage.setItem("access_token", token); // Store token
                
                dispatch(createUser(data.user))
                toast.success("Logged In")
                navigate("/courses")
            } catch (err) {
                console.log(err.message);
                toast.error("Login failed. Please try again.");
            }
        }
    })

    return (
        <div style={containerStyles}>
            <form onSubmit={formik.handleSubmit} style={formStyles}>
                <input
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className='p-3'
                    style={inputStyles}
                    type="text"
                    name='username'
                    placeholder='Enter username'
                />
                <input
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className='p-3'
                    style={inputStyles}
                    type="password"
                    name='password'
                    placeholder='Enter password'
                />
                <button className='btn btn-success w-100' type='submit'>Login</button>
                <button
                    className='btn btn-secondary w-100 mt-2'
                    type='button'
                    onClick={() => navigate('/signup')}
                >
                    Signup
                </button>
            </form>
        </div>
    )
}

const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
}

const formStyles = {
    width: '400px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
}

const inputStyles = {
    borderRadius: '5px',
    border: '1px solid #ced4da',
    fontSize: '16px',
}

export default Login
