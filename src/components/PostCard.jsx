import moment from "moment/moment";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Menu } from "@mantine/core";
import { motion } from "framer-motion";
import { AuthContext } from "@/layouts/AuthLayout";
import { useContext } from "react";

export default function PostCard({
  handleFetchPost,

  id,
  caption,
  media,
  createdAt,
  user,
  postLikes,
}) {
  const { loggedInUser } = useContext(AuthContext);
  const [likes, setLikes] = useState(postLikes);
  // console.log(likes, "from PostCard");
  const likePost = async (postId) => {
    const response = await axios.post(
      `http://localhost:8080/api/likePost/${postId}`,
      { userId: loggedInUser.id }
    );
    console.log(response);
  };
  return (
    <>
      <div className="md:w-[65%] w-[85%] mb-4 h-auto   rounded-xl bg-zinc-800 text-white">
        <div className="flex justify-between py-2 px-2">
          <Link
            href={`/${user.username}/profile`}
            className="flex items-center cursor-pointer space-x-3"
          >
            {user.profilePic ? (
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
            <p>{user.username}</p>
          </Link>
          <Menu
            transition="rotate-right"
            transitionDuration={150}
            position="bottom-end"
            className={"font-semibold"}
          >
            <Menu.Target>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Menu.Target>
            <Menu.Dropdown>
              <div className="w-64 font-medium">
                <Menu.Item
                  onClick={() => {
                    handleFetchPost(id);
                  }}
                >
                  Edit Post
                </Menu.Item>
              </div>
              <div>
                <Menu.Item>Delete Post</Menu.Item>
              </div>
            </Menu.Dropdown>
          </Menu>
        </div>
        <div className="w-full">
          <img src={media} alt="" />
        </div>
        <div className="flex justify-between py-1 px-2">
          <div className="flex">
            <motion.svg
              whileTap={{ scale: 0.9 }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer mr-3 "
              onClick={() => likePost(id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </motion.svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </div>

        <p className="text-sm">{likes + `${likes > 1 ? " like" : " likes"}`}</p>
        {caption}
        <p className="text-sm">{moment(createdAt).fromNow()}</p>
      </div>
    </>
  );
}
