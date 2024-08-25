import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Outlet} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login, logout } from "./store/auth_slice";


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('https://write-about-me-ai.vercel.app/api/v1/users/get_current_user')
    .then((response) => {
      console.log("Current user found!" , response);
      dispatch(login(response.data.data))
    })
    .catch((error) => {
      console.log("Error finding current user - User logged out");
      dispatch(logout())
      
    })

  } , [])



  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

