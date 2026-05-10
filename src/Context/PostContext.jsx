import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";

export let PostContext = createContext();

export default function PostContextProvider({ children }) {

  function getHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
  }

  async function getSinglePost(id) {
    try {
      const { data } = await axios.get(`/api/posts/${id}`, { headers: getHeaders() });
      return data.data.post;
    } catch (error) {
      console.error("getSinglePost error:", error);
    }
  }

  async function getUserData() {
    try {
      const { data } = await axios.get("/api/users/profile-data", { headers: getHeaders() });
      return data.data.user;
    } catch (error) {
      console.error("getUserData error:", error);
    }
  }

  async function getUserPosts(id) {
    try {
      const { data } = await axios.get(`/api/users/${id}/posts?limit=50`, { headers: getHeaders() });
      return data.data.posts;
    } catch (error) {
      console.error("getUserPosts error:", error);
    }
  }

  async function createComments(body) {
    try {
      const postId = body.post;
      const { data } = await axios.post(
        `/api/posts/${postId}/comments`,
        { content: body.content },
        { headers: getHeaders() }
      );
      toast.success("Comment added!");
      return data.data.comments;
    } catch (error) {
      toast.error("Failed to add comment.");
      console.error("createComments error:", error);
    }
  }

  async function createPost(formData) {
    try {
      const { data } = await axios.post("/api/posts", formData, { headers: getHeaders() });
      toast.success("Post created!");
      return data.data.post;
    } catch (error) {
      toast.error("Failed to create post.");
      console.error("createPost error:", error);
    }
  }

  async function deletePost(id) {
    try {
      const { data } = await axios.delete(`/api/posts/${id}`, { headers: getHeaders() });
      toast.success("Post deleted.");
      return data;
    } catch (error) {
      toast.error("Failed to delete post.");
      console.error("deletePost error:", error);
    }
  }

  return (
    <PostContext.Provider
      value={{
        getUserData,
        createComments,
        getUserPosts,
        getSinglePost,
        createPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}