import React from 'react'
import { useFormik } from "formik"
import { api } from '../axios'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { createUser } from '../Redux/userSlice'

const Signup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirm_password: ""
        },

        onSubmit: async (values) => {
            try {
                // Send the basic details to the backend
                const { data } = await api.post("/users/signup", values)
                console.log(data.token)

                // Store the token in localStorage
                localStorage.setItem("access_token", data.token)

                // Dispatch user data to the Redux store
                dispatch(createUser(data.user))

                // Notify user that account is created
                toast.success("Account Created")

                // Navigate to the student details page to fill additional info
                navigate("/courses")
            } catch (err) {
                toast.error(err.response?.data.message || err.message)
                console.log(err.message)
            }
        }
    })

    return (
        <div style={containerStyles}>
            <form onSubmit={formik.handleSubmit} style={formStyles}>
                <input
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className='p-3'
                    style={inputStyles}
                    type="text"
                    name='name'
                    placeholder='Enter name'
                />
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
                    value={formik.values.email}
                    className='p-3'
                    style={inputStyles}
                    type="text"
                    name='email'
                    placeholder='Enter email'
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
                <input
                    onChange={formik.handleChange}
                    value={formik.values.confirm_password}
                    className='p-3'
                    style={inputStyles}
                    type="password"
                    name='confirm_password'
                    placeholder='Re-enter password'
                />
                <button className='btn btn-success w-100' type='submit'>Create Account</button>
            </form>
        </div>
    )
}

const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    marginTop: '-10vh',  // Moves the form upwards
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

export default Signup
