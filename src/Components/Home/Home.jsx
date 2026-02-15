import React, { useContext, useEffect, useState } from 'react';
import styles from './Home.module.css';
import { PostContext } from '../../Context/PostContext';
import PostCard from '../PostCard/PostCard';

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const { getAllPosts } = useContext(PostContext);

  async function getPosts() {
    const response = await getAllPosts();
    console.log(response);
    setAllPosts(response);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-full">
            {allPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}