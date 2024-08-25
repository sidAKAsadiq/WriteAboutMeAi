import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/auth_slice";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [res, set_res] = useState({});

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const submit = async (data) => {
    axios
      .post("https://write-about-me-ai.vercel.app/api/v1/users/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      },
         {
          headers: {
            "Content-Type": "application/json",
          },)
      .then((response) => {
        console.log("Response: ", response);
        set_res(response.data);
        dispatch(login(response.data.data));
        navigate('/login')
      })
      .catch((error) => {
        console.log("Error: ", error);
        navigate('/register')
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-purple-700">
      <h1 className="text-4xl font-extrabold text-white mb-8">WriteAboutMe.Ai</h1>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-96"
        style={{ animation: "fadeIn 1s ease-in-out" }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Register</h2>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
          className="mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
          className="mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          className="mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
        >
          Submit
        </button>
        <Link 
                    to={'/login'} 
                    className="mt-4 text-center text-blue-600 hover:text-blue-700 transition-colors duration-300"
                >
                    Already have an account?
                </Link>        
      </form>
      {res?.message && <h1 className="mt-4 text-red-500">{res.message}</h1>}
    </div>
  );
}

export default Register;
