import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children , authentication = true}) {
    const dispatch = useDispatch()
    const is_authenticated = useSelector(state => state.auth.is_authenticated)
    
    console.log("in pro is auth", is_authenticated);
    console.log("in pro authentication", authentication);
    
    const [loader , set_loader] = useState("true")
    const navigate = useNavigate()

    //Authentication = true, means those routes where you cannot go without being logged in
    //while auth = false, means those routes where you can only go when you are not logged in



    useEffect(() => {

         if (is_authenticated !== null) {
            if (authentication && !is_authenticated) {
                navigate('/login');
            } else if (!authentication && is_authenticated) {
                navigate('/');
            }
            set_loader(false);
        }

    }, [is_authenticated , navigate , authentication])

    return (
    loader ? <h1>Loading...</h1> : <>{children}</>
  )
}

export default Protected