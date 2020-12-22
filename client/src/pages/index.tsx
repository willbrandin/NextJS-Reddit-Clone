import React, { Fragment } from "react";
import Head from "../components/head";
import PostCard from "../components/PostCard";
import useSwr from "swr";

const Home = () => {
  const { data: posts } = useSwr("/posts");

  return (
    <Fragment>
      <Head title="readit: The Front Page of the Internet" />
      <div className="container flex pt-4">
        <div className="w-160">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
