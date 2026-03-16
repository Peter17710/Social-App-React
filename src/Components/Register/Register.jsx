import React from "react";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  // joi , formik , useForm ( yup , zod )
  let navigate = useNavigate();
  let schema = z
    .object({
      name: z.string().nonempty("Name is Required"),
      email: z.string().email("Email not Valid").nonempty("Email is Required"),
      password: z
        .string()
        .nonempty("Password is Required")
        .regex(/^[A-Z][a-z0-9]{3,8}/, "Password must start with capital char"),
      rePassword: z
        .string()
        .nonempty("Repassword is Required")
        .regex(/^[A-Z][a-z0-9]{3,8}/, "Password must start with capital char"),
      dateOfBirth: z.string().nonempty("Date is Required"),
      gender: z.enum(["male", "female"]),
    })

    .refine((data) => data.password == data.rePassword, {
      message: "Passwords Not match",
      path: ["rePassword"],
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
        "/api/users/signup",
        values
      );
      console.log(data);
      // login
      if (data.message == "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.error);
      setError("root", { message: error.response.data.error });
    }
  }
  return (
    <>
      <div className="w-1/2 mx-auto shadow-lg p-5 my-5">
        <h1 className="text-blue-800 font-bold text-2xl my-4">Register Now</h1>
        {errors.root && <p className="text-red-400">{errors.root.message}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            type="text"
            placeholder="Type Your Name..."
            className="input focus:outline-0 w-full my-2 rounded-xl"
          />
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}
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

          <input
            {...register("rePassword")}
            type="password"
            placeholder="Confirm Password..."
            className="input focus:outline-0 w-full my-2 rounded-xl"
          />
          {errors.rePassword && (
            <p className="text-red-400">{errors.rePassword.message}</p>
          )}

          <input
            {...register("dateOfBirth")}
            type="Date"
            placeholder="Type Your Date..."
            className="input focus:outline-0 w-full my-2 rounded-xl"
          />
          {errors.dateOfBirth && (
            <p className="text-red-400">{errors.dateOfBirth.message}</p>
          )}
          <div className="my-2">
            <input
              {...register("gender")}
              type="radio"
              name="gender"
              id="male"
              value="male"
              className="radio radio-primary"
            />
            <label htmlFor="male" className="px-2">
              Male
            </label>
            <input
              {...register("gender")}
              type="radio"
              name="gender"
              id="female"
              value="female"
              className="radio radio-primary"
            />
            <label htmlFor="female" className="px-2">
              Female
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-400">{errors.gender.message}</p>
          )}
          <button
            disabled={isSubmitting}
            type="submit"
            className="my-3 bg-blue-800 cursor-pointer text-white rounded-xl px-4 py-3"
          >
            {isSubmitting ? "Loading...." : "SignUp"}
          </button>
        </form>
      </div>
    </>
  );
}
