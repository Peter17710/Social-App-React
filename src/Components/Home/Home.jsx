import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { PostContext } from "../../Context/PostContext";
import PostCard from "../PostCard/PostCard";
import Loader from "../Loader/Loader";
import AddPost from "../AddPost/AddPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {


  function getData() {
    let headers = {
      token: localStorage.getItem("userToken"),
    };

    return axios.get("/api/posts?limit=50", {
      headers
    })
  }
  let {data , isError , isLoading , isFetching , error}= useQuery({
    queryKey: ["allPosts"],
    queryFn: getData,
    select:(data)=> data?.data?.posts,
    // staleTime:2000,
    // retry:2,
    // retryDelay:4000,
    refetchInterval:3000,
    gcTime:3000
  });

  console.log(data);

 

  return (
    <div className="container mx-auto p-4">
      {isError? <p className="text-center text-red-500">{error.message}</p>:""}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AddPost />
          <div className="flex justify-center items-center">
            <div className="w-full">
              {data?.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
   
  );
}
