import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/auth_slice'


function Login() {
    const [res , set_res] = useState({})
    const {register , handleSubmit, setValue , getValues} = useForm({
        defaultValues : {
            username_or_email : "",
            password : "",
        }
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submit = async(data) => {
        axios.post('/api/v1/users/login', {
            username_or_email : data.username_or_email,
            password : data.password
        })
        .then((response) => {
            console.log("Login response : " , response.data.data);
            dispatch(login(response.data.data))
            set_res(response.data.data)
            console.log("RES : " , res);
            navigate('/')      
        })
        .catch((error) => {
            console.log("Login error : " , error);
            set_res(AxiosError.data.data)
            console.log("RES : " , res);
            navigate('/login')      

        
        })
    }





    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col bg-white p-6 rounded-lg shadow-md w-80"
          >
            <input
              type="text"
              placeholder="Username or Email"
              {...register('username_or_email', { required: true })}
              className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
              className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </button>
          </form>
          {res?.message && <h1 className="mt-4 text-red-500">{res.message}</h1>}
        </div>
      );
      
}

export default Login