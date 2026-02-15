import React, { useContext } from 'react'
import styles from './Login.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import TokenContextProvider, { TokenContext } from '../../Context/TokenContext';

export default function Login() {

  let { token, setToken } = useContext(TokenContext);

      let schema = z.object({
        email: z.string().nonempty("Email is required").email("Invalid email address"),
        password: z.string().nonempty("Password is required").regex(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/, "Password must be at least 6 characters, include an uppercase letter and a digit")
      })

    let navigate = useNavigate();
    let {register , handleSubmit , setError , formState: { errors , isSubmitting }} =useForm({resolver: zodResolver(schema)});
      
      async  function onSubmit(values){
    console.log(values);

    try{
          let {data} = await axios.post("https://linked-posts.routemisr.com/users/signin" , values)
          console.log(data);
          if(data.message === "success"){
            //1- save token to local storage
            localStorage.setItem("userToken" , data.token);
             //2- save token to tokenContext
            setToken(data.token);
            navigate('/')
          }
    }
    catch(error){
      const message = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'An error occurred';
      console.log(message);
      setError("root", { message });
    }

  }

  return (
  <>
    <div className="w-1/2 mx-auto shadow-xl my-5 px-5 py-3">
    
    <h1 className="text-blue-800 text-2xl my-5 font-bold">Login Now</h1>
    <form onSubmit={handleSubmit(onSubmit)}>

      <input {...register("email")} type="email" placeholder="Type your email . . .  " className="w-full focus:outline-0 border-slate-400 my-2 rounded-2 input input-neutral" />
             {errors.email && <p className='text-red-500'> {errors.email.message} </p>}

      <input {...register("password")} type="password" placeholder="Type your password . . .  " className="w-full focus:outline-0 border-slate-400 my-2 rounded-2 input input-neutral" />
             {errors.password && <p className='text-red-500'> {errors.password.message} </p>}

             {errors.root && <p className='text-red-500'> {errors.root.message} </p>}
    <button type='submit' disabled={isSubmitting} className='px-3 py-2 rounded-xl  bg-blue-800 text-white mx-1 my-2 hover:bg-blue-500 '>{isSubmitting? "Loading..." : "Login"}</button>
    </form>
    </div>

   </>
  )
}
