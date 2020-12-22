import Axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import Head from "../components/head";
import { Post } from "../types";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    Axios.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(posts);

  return (
    <div className="pt-12">
      <Head title="readit: The Front Page of the Internet" />
      <div className="container flex pt-4">
        <div className="w-160">
          {posts.map((post) => (
            <PostCard post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
