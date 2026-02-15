import React from 'react'
import styles from './Register.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

export default function Register() {

  let schema = z.object({
    name: z.string().nonempty("Name is required").min(3 , "Name must be at least 3 characters") ,
    email: z.string().nonempty("Email is required").email("Invalid email address") ,
    password: z.string().regex(/^[A-Z][a-z0-9]/ , "Password not valid").nonempty("Password is required") ,
    rePassword: z.string().regex(/^[A-Z][a-z0-9]/ , "Password not valid").nonempty("Password is required") ,
    dateOfBirth: z.string().nonempty("Date of Birth is required") ,
    gender: z.enum(["male" , "female"])
  })

  .refine((data) => data.password === data.rePassword , {message: "Passwords do not match" , path: ["rePassword"]})



  let navigate = useNavigate();

  let {register , handleSubmit , setError , formState: { errors , isSubmitting }} =useForm({resolver: zodResolver(schema)});
  async  function onSubmit(values){
    console.log(values);

    try{
          let {data} = await axios.post("https://linked-posts.routemisr.com/users/signup" , values)
          console.log(data);
          if(data.message === "success"){
            navigate('/login')
          }
    }
    catch(error){
      // console.log(error.respose.data.error);
      // setError("root" , {message: error.response.data.error})

      const message = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'An error occurred';
      console.log(message);
      setError("root", { message });
    }


  }

  return (
   <>

    <div className="w-1/2 mx-auto shadow-xl my-5 px-5 py-3">
    

    <h1 className="text-blue-800 text-2xl my-5 font-bold">Register Now</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} type="text" placeholder="Type your name . . .  " className="w-full focus:outline-0 border-slate-400 my-2 rounded-2 input input-neutral" />
           {errors.name && <p className='text-red-500'> {errors.name.message} </p>}

      <input {...register("email")} type="email" placeholder="Type your email . . .  " className="w-full focus:outline-0 border-slate-400 my-2 rounded-2 input input-neutral" />
            {errors.email && <p className='text-red-500'> {errors.email.message} </p>}

      <input {...register("password")} type="password" placeholder="Type your password . . .  " className="w-full focus:outline-0 border-slate-400 my-2 rounded-2 input input-neutral" />
            {errors.password && <p className='text-red-500'> {errors.password.message} </p>}

      <input {...register("rePassword")} type="password" placeholder="Confirm Password . . .  " className="w-full focus:outline-0 border-slate-400 my-2 rounded-2 input input-neutral" />
            {errors.rePassword && <p className='text-red-500'> {errors.rePassword.message} </p>}

      <input {...register("dateOfBirth")} type="date" placeholder="Select date " className="w-full focus:outline-0 border-slate-400 my-2 rounded-2 input input-neutral" />
            {errors.dateOfBirth && <p className='text-red-500'> {errors.dateOfBirth.message} </p>}


    <div className="my-2">
      <input {...register("gender" , {required: "Gender is required"})} type="radio" id='male' value='male' name="gender" className="radio radio-primary"/>
    <label htmlFor="male" className='px-2'>Male</label>
    <input  {...register("gender" , {required: "Gender is required"})} type="radio" id='female' value='female' name="gender" className="radio radio-primary" />
   <label htmlFor="female" className='px-2'>Female</label>
    </div>

        {errors.gender && <p className='text-red-500'> {errors.gender.message} </p>}
        {errors.root && <p className='text-red-500'> {errors.root.message} </p>}
    <button type='submit' disabled={isSubmitting} className='px-3 py-2 rounded-xl  bg-blue-800 text-white mx-1 my-2 hover:bg-blue-500 '>{isSubmitting? "Loading..." : "SignUp"}</button>
    </form>
    </div>

   </>
  )
}
