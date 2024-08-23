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
    <>
    <form onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder='username/email' {...register ('username_or_email' , {required : true})}/>
        <input type="password" placeholder='password' {...register ('password' , {required : true})}/>
        <button type='submit'>Login</button>
    </form>
    <h1>{res?.message}</h1>
    </>
  )
}

export default Login