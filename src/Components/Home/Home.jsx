import React from "react";
import PostCard from "../PostCard/PostCard";
import Loader from "../Loader/Loader";
import AddPost from "../AddPost/AddPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  function getData() {
    return axios.get("/api/posts?limit=50", {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    });
  }

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getData,
    select: (data) => data?.data?.data?.posts,
    refetchInterval: 30000,
    gcTime: 5000,
  });

  return (
    <div style={{ maxWidth:900,margin:"0 auto",padding:"28px 16px" }}>
      <div style={{ maxWidth:600,margin:"0 auto" }}>
        {isError && (
          <div style={{ background:"var(--danger-light)",border:"1px solid #fecaca",borderRadius:"var(--radius-md)",padding:"12px 16px",marginBottom:16,color:"var(--danger)",fontSize:14 }}>
            {error.message}
          </div>
        )}
        {isLoading ? <Loader/> : (
          <>
            <AddPost callback={refetch}/>
            {data?.length === 0 && (
              <div style={{ textAlign:"center",padding:"60px 0",color:"var(--text-tertiary)" }}>
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin:"0 auto 12px",display:"block" }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <p style={{ fontSize:16,fontWeight:500 }}>No posts yet</p>
                <p style={{ fontSize:13,marginTop:4 }}>Be the first to post something!</p>
              </div>
            )}
            {data?.map((post, i) => (
              <div key={post._id} style={{ animationDelay:`${i*0.05}s` }}>
                <PostCard post={post} callback={refetch}/>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}