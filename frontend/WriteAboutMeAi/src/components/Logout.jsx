import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/auth_slice'

function Logout() {
    const [res, set_res] = useState(null)

    const navigate = useNavigate()
    console.log("In logout!");
    
    const dispatch = useDispatch()

    axios.get('/api/v1/users/logout')
    .then((response) => {
        dispatch(logout())
        console.log(response);
        set_res(response.data)
        console.log("Res" , res);
        navigate('/')
    })
    .catch((error) => {
        console.log("Erorr", error.response.data);
        set_res(error.response.data)
        console.log("Res" , res);
    })

    return(
        <>
        <h1>{res?.data}</h1>
        </>
    )

}

export default Logout