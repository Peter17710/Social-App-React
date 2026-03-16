import React, { useContext } from "react";
import styles from "./AddPost.module.css";
import { PostContext } from "../../Context/PostContext";
import { useState } from "react";

export default function AddPost({ callback }) {
  let { createPost } = useContext(PostContext);
  const [postBody, setPostBody] = useState("");
  const [postImage, setPostImage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreatePost(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log("hii", postBody, postImage);
    let formData = new FormData();

    formData.append("body", postBody);
    formData.append("image", postImage);
    let response = await createPost(formData);
    console.log(response);
    callback();
    setIsLoading(false);
  }

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-blue-800 text-3xl my-5">Add Post</h2>

      <form onSubmit={(e) => handleCreatePost(e)}>
        <input
          name="body"
          type="text"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          placeholder="Type Your post ..."
          className="input focus:outline-0 w-full my-2 rounded-xl"
        />
        <input
          name="image"
          type="file"
          onChange={(e) => setPostImage(e.target.files[0])}
          placeholder="Type Your image..."
          className="input focus:outline-0 w-full my-2 rounded-xl"
        />
        {isLoading ? (
          <button
            type="submit"
            className="bg-blue-800 text-white px-3 py-2 rounded-xl"
          >
            Loading......
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-800 text-white px-3 py-2 rounded-xl"
          >
            Add Post
          </button>
        )}
      </form>
    </div>
  );
}
