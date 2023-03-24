import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { verify } from "jsonwebtoken";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { getAllPosts } from "../api/getPosts";
import AuthLayout from "../../layouts/AuthLayout";
import PostCard from "@/components/PostCard";
import useSWR from "swr";
import axios from "axios";
import Loader from "@/components/Loader";
import { Overlay, Modal } from "@mantine/core";
import { useState } from "react";
import Link from "next/link";
import moment from "moment/moment";

import { motion } from "framer-motion";

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response;
};
export default function dashboard({ posts }) {
  const [inspectPost, setInspectPost] = useState(false);
  const [post, setPost] = useState("");
  const { data: allPost, error: allPostError } = useSWR(
    "http://localhost:8080/api/getPosts",
    fetcher
  );

  const handleFetchPost = async (id) => {
    setInspectPost(true);
    const response = await axios.get(`http://localhost:8080/api/getPost/${id}`);
    console.log(response, "res");
    setPost(response.data);
  };

  if (allPostError) {
    return <p>{error.message}</p>;
  }

  if (!allPost) {
    return <Loader />;
  }

  console.log(post, "post");
  console.log(posts);
  return (
    <>
      <Modal
        className="bg-[#56565661] padding-0"
        // unstyled
        transitionDuration={600}
        opened={inspectPost}
        onClose={() => setInspectPost(false)}
      >
        <>
          <div className=" mb-4 h-auto bg-zinc-800 text-white">
            <div className="flex justify-between py-2 px-2">
              <Link
                href={`/${post.user?.username}/profile`}
                className="flex items-center cursor-pointer space-x-3"
              >
                {post.user?.profilePic ? (
                  <img src="" />
                ) : (
                  <div className="rounded-full border bg-cyan-400 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                )}
                <p>{post.user?.username}</p>
              </Link>
            </div>
            <div className="w-full">
              <img src={post.media} alt="" />
            </div>

            {post.caption}
            <p className="text-sm">{moment(post.createdAt).fromNow()}</p>
          </div>
        </>
      </Modal>

      <div className="w-full">
        <div className="flex flex-col items-center">
          {allPost?.data.map((i, key) => (
            <PostCard
              handleFetchPost={handleFetchPost}
              key={key}
              id={i.id}
              postLikes={i.likes.length}
              user={i.user}
              caption={i.caption}
              media={i.media}
              createdAt={i.createdAt}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// export async function getServerSideProps({ req, res }) {
//   let payload;

//   if (req.cookies.refreshToken) {
//     payload = verify(req.cookies.refreshToken, process.env.SECRET_KEY);
//     console.log(payload);
//   }

//   return {
//     props: {
//       data: {
//         username: payload?.username,
//       },
//     },
//   };
// }

dashboard.Layout = AuthLayout;

export async function getServerSideProps() {
  const posts = await getAllPosts();
  console.log(JSON.parse(JSON.stringify(posts)));
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
