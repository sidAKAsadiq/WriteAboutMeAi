import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/auth_slice'

function Login() {
    const [res, set_res] = useState({})
    const { register, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            username_or_email: "",
            password: "",
        }
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submit = async (data) => {
        axios.post('/api/v1/users/login', {
            username_or_email: data.username_or_email,
            password: data.password
        })
        .then((response) => {
            console.log("Login response: ", response.data.data);
            dispatch(login(response.data.data))
            set_res(response.data.data)
            console.log("RES: ", res);
            navigate('/')      
        })
        .catch((error) => {
            console.log("Login error: ", error);
            set_res(error.response?.data || { message: "An error occurred" });
            console.log("RES: ", res);
            navigate('/login')      
        })
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-purple-700">
            <h1 className="text-4xl font-extrabold text-white mb-8">WriteAboutMe.Ai</h1>
            <form
                method='post'
                onSubmit={handleSubmit(submit)}
                className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-96"
                style={{ animation: "fadeIn 1s ease-in-out" }}
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>
                <input
                    type="text"
                    placeholder="Username or Email"
                    {...register('username_or_email', { required: true })}
                    className="mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                    className="mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <button
                    type="submit"
                    className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
                >
                    Login
                </button>
                <Link 
                    to={'/register'} 
                    className="mt-4 text-center text-blue-600 hover:text-blue-700 transition-colors duration-300"
                >
                    Create an account
                </Link>
            </form>
            {res?.message && <h1 className="mt-4 text-red-500">{res.message}</h1>}
        </div>
    );
}

export default Login
