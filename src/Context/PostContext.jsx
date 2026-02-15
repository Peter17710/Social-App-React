import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";

export let PostContext = createContext();

export default function PostContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function getAllPosts() {
    try {
      let { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50",
        {
          headers,
                  
        }
      );
      console.log(data);

      return data.posts;
    } catch (error) {
      console.log(error);
    }
  }

  async function getSinglePost(id) {
    try {
      let { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers,
        }
      );

      return data.post;
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserData() {
    try {
      let { data } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        {
          headers,
        }
      );

      return data.user;
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserPosts(id) {
    try {
      let { data } = await axios.get(
        `https://linked-posts.routemisr.com/users/${id}/posts?limit=50`,
        {
          headers,
        }
      );

      return data.posts;
    } catch (error) {
      console.log(error);
    }
  }

  async function createComments(body) {
    try {
      let { data } = await axios.post(
        `https://linked-posts.routemisr.com/comments`,
        body,
        {
          headers,
        }
      );

      console.log(data, " create comments");
      toast.success("Comment Successfully created !");
      return data.comments;
    } catch (error) {
      toast.error("Comment not created !");
      console.log(error);
    }
  }

    async function createPost(formData) {
        let headers = {
    token: localStorage.getItem("userToken"),
  };
    try {
      let { data } = await axios.post(
        `https://linked-posts.routemisr.com/posts`,
        formData,
        {
          headers,
        }
      );

      console.log(data, " create post");
      toast.success("post Successfully created !");
      // return data.comments;
    } catch (error) {
      toast.error("post not created !");
      console.log(error);
    }
  }
    async function deletePost(id) {
        let headers = {
    token: localStorage.getItem("userToken"),
  };
    try {
      let { data } = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers,
        }
      );

      console.log(data, " del post");
      toast.success("post Successfully created !");
      return data.comments;
    } catch (error) {
      toast.error("post not created !");
      console.log(error);
    }
  }
  return (
    <PostContext.Provider
      value={{
        getAllPosts,
        getUserData,
        createComments,
        getUserPosts,
        getSinglePost,
        createPost,
        deletePost
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
