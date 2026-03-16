import React, { useContext, useEffect, useState } from "react";
import styles from "./UserPosts.module.css";
import { PostContext } from "../../Context/PostContext";
import PostCard from "../PostCard/PostCard";
import Loader from "../Loader/Loader";
import AddPost from "../AddPost/AddPost";

export default function UserPosts() {
  let { getUserData, getUserPosts } = useContext(PostContext);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUserPosts() {
    let data = await getUserData();
    console.log(data, "User Data");
    let response = await getUserPosts(data._id);
    console.log(response);
    setUserPosts(response);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUserPosts();
  }, []);
  return (
    <div>
      <div className="container mx-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <AddPost callback={fetchUserPosts} />
            <div className="w-full">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <PostCard
                    callback={fetchUserPosts}
                    post={post}
                    key={post._id}
                  />
                ))
              ) : (
                <p className="text-center text-blue-800 text-3xl">No Posts</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
