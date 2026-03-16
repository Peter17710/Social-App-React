import React, { useContext } from "react";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TokenContext } from "../../Context/TokenContext";

export default function Login() {
  let navigate = useNavigate();
  let {token , setToken} = useContext(TokenContext);
  
  
  let schema = z.object({
    email: z.string().email("Email not Valid").nonempty("Email is Required"),
    password: z
      .string()
      .nonempty("Password is Required")
      .regex(/^[A-Z][a-z0-9]{3,8}/, "Password must start with capital char"),
  });

  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });
  async function onSubmit(values) {
    try {
      console.log(values);
      let { data } = await axios.post(
        "/api/users/signin",
        values
      );
      console.log(data);
      //  save token to local storage

      // all components (state  => )
      if (data.message == "success") {
        localStorage.setItem("userToken", data.token);
        //  save token to context
        setToken(data.token)
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.error);
      setError("root", { message: error.response.data.error });
    }
  }
  return (
    <>
      <div className="w-1/2 mx-auto shadow-lg p-5 my-5">
        <h1 className="text-blue-800 font-bold text-2xl my-4">Login Now</h1>
        {errors.root && <p className="text-red-400">{errors.root.message}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="email"
            placeholder="Type Your Email..."
            className="input focus:outline-0 w-full my-2 rounded-xl"
          />
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Type Your Password..."
            className="input focus:outline-0 w-full my-2 rounded-xl"
          />
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className="my-3 bg-blue-800 cursor-pointer text-white rounded-xl px-4 py-3"
          >
            {isSubmitting ? "Loading...." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
