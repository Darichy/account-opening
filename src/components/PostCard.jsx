import moment from "moment/moment";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Menu } from "@mantine/core";
import { motion } from "framer-motion";
import { AuthContext } from "@/layouts/AuthLayout";
import { useContext } from "react";
import { Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { setPostRefetch } from "@/store/postSlice";

export default function PostCard({
  handleFetchPost,

  id,
  caption,
  media,
  createdAt,
  user,
  postLikes,
}) {
  const { loggedInUser } = useSelector((state) => state.user);

  const [likes, setLikes] = useState(postLikes);
  const [deletePost, setDeletePost] = useState(false);
  // console.log(likes, "from PostCard");
  const dispatch = useDispatch();
  // console.log({ loggedInUser, id });
  const handlePostDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/deletePost/${postId}`
      );
      console.log(response);
      setDeletePost({ status: false });
      dispatch(setPostRefetch());
    } catch (error) {
      console.log(error);
    }
  };
  const likePost = async (postId) => {
    const response = await axios.post(
      `http://localhost:8080/api/likePost/${postId}`,
      { userId: loggedInUser.id }
    );
  };

  async function handleFollow() {
    const response = await axios.post(
      "http://localhost:8080/api/followUnfollow",
      {
        followerId: user?.id,
        followingId: loggedInUser?.id,
      }
    );
    dispatch(setPostRefetch());
    console.log({ response });
  }
  return (
    <>
      <Modal opened={deletePost.status} onClose={() => setDeletePost(false)}>
        <div>
          <p>Are you sure you want to delete this post?</p>
          <div className="flex space-x-4 justify-end">
            <button onClick={() => setDeletePost(false)}>Cancel</button>
            <button onClick={() => handlePostDelete(deletePost.id)}>Yes</button>
          </div>
        </div>
      </Modal>
      <div className="md:w-[70%] w-[85%] mb-4 h-auto border border-zinc-600 py-2  rounded-xl bg-zinc-800 text-white">
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
            <p>
              {user.username}
              <span className="ml-2 text-sm text-zinc-400 font-semibold">
                . {moment(createdAt).fromNow()}
              </span>
            </p>
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
              {loggedInUser.id === user.id ? (
                <>
                  <div className="w-64 font-medium">
                    <Menu.Item
                      onClick={() => {
                        handleFetchPost(id);
                      }}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => setDeletePost({ status: true, id: id })}
                    >
                      <div className="flex space-x-2 items-center font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 stroke-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>

                        <p>Delete Post</p>
                      </div>
                    </Menu.Item>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-64 font-medium">
                    <Menu.Item
                      onClick={() => {
                        handleFollow();
                      }}
                    >
                      {user.followers.find(
                        (i) => i.followingId === loggedInUser.id
                      )
                        ? "Unfollow"
                        : "Follow"}
                    </Menu.Item>
                  </div>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        </div>
        <div className="w-full">
          <img src={media} alt="" />
        </div>
        <div className>
          <div className="flex justify-between py-1 px-2">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer mr-3 active:scale-90 transform transition duration-300 ease-in-out "
                // onClick={() => likePost(id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer mr-3 active:scale-90 transform transition duration-300 ease-in-out"
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
                className="w-6 h-6 cursor-pointer mr-3 active:scale-90 transform transition duration-300 ease-in-out"
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

          <div className="px-2 text-sm">
            <p className="text-xs ">
              {likes + `${likes > 1 ? " like" : " likes"}`}
            </p>
            {caption}
          </div>
        </div>
      </div>
    </>
  );
}
