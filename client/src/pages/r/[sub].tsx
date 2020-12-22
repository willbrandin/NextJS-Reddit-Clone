import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import PostCard from "../../components/PostCard";

const Sub = () => {
  const router = useRouter();
  const subName = router.query.sub;

  const { data: sub, error } = useSWR(subName ? `/subs/${subName}` : null);

  if (error) {
    router.push("/");
  }

  let postMarkup;
  if (!sub) {
    postMarkup = <p className="text-lg text-center">Loading...</p>;
  } else if (sub.posts.length === 0) {
    postMarkup = <p className="text-lg text-center">No posts yet</p>;
  } else {
    postMarkup = sub.posts.map((post) => (
      <PostCard post={post} key={post.identifier} />
    ));
  }

  return (
    <div className="container flex pt-5">
      {sub && <div className="w-160">{postMarkup}</div>}
    </div>
  );
};

export default Sub;
