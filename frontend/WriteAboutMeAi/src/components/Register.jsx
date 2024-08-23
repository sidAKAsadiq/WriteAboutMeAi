import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/auth_slice";

function Register() {
  const [res, set_res] = useState({});

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch()

  const submit = async (data) => {
    axios
      .post("/api/v1/users/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log("Response : ", response);
        set_res(response.data);
        dispatch(login(response.data.data))
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  return(
  <>
    <h1 className="bg-black text-white">Write About Me Ai</h1>

    <form onSubmit={handleSubmit(submit)}>
      <input
        type="text"
        placeholder="username"
        {...register("username", { required: true })}
      />
      <input
        type="text"
        placeholder="email"
        {...register("email", { required: true })}
      />
      <input
        type="password"
        placeholder="password"
        {...register("password", { required: true })}
      />
      <button type="submit">Submit</button>
    </form>

    {res.message}
  </>
  )
}

export default Register;
