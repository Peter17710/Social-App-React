import React, { useContext, useEffect, useState } from "react";
import styles from "./PostDetails.module.css";
import { useParams } from "react-router-dom";
import { PostContext } from "../../Context/PostContext";
import PostCard from "../PostCard/PostCard";
import Loader from "../Loader/Loader";

export default function PostDetails() {
  let { getSinglePost } = useContext(PostContext);
  const [singlePost, setsinglePost] = useState({});
  const [isLoading, setisLoading] = useState(true);

  let { id } = useParams();
  console.log(id);

  async function getPostDeatils(id) {
    let response = await getSinglePost(id);
    // console.log(response, "Single Post Details");
    setsinglePost(response);
    setisLoading(false);
  }

  useEffect(() => {
    getPostDeatils(id);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center flex-column">
          <div className="w-full">
            <PostCard post={singlePost} />
          </div>
        </div>
      )}
    </div>
  );
}
