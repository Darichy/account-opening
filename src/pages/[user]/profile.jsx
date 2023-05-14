import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/layouts/AuthLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PostCard from "@/components/PostCard";
import axios from "axios";

export default function profile() {
  const { loggedInUser } = useSelector((state) => state.user);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const username = router.query.user;
  // console.log(username, "username");
  async function handleFollow() {
    const response = await axios.post(
      "http://localhost:8080/api/followUnfollow",
      {
        followerId: user?.id,
        followingId: loggedInUser,
      }
    );
    console.log(response);
  }
  useEffect(() => {
    async function getUser() {
      const response = await axios.get(
        `http://localhost:8080/api/getUser/${username}`
      );
      setUser(response.data);
    }

    getUser();
  }, [username]);

  console.log(posts, user);
  return (
    <div className="w-full   ">
      <div className="bg-zinc-800 pb-2">
        <div
          className="h-48 relative bg-contain bg-center"
          style={{ background: `url("/coverPic.jpg")` }}
        >
          <div className="absolute -bottom-20 left-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-44 h-44 bg-zinc-800 border-4 stroke-cyan-500 border-cyan-500 rounded-full px-3 py-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
        </div>

        <div className="mt-[2rem] px-7 ">
          <div className="font-bold  flex mt-8 justify-between">
            <p className="flex justify-center text-xl ml-48">
              {user?.username}
            </p>
            <div className="grid grid-cols-3 gap-5 text-center">
              <div className="text-center">
                <p>Posts</p>
                <p>{user.Post?.length}</p>
              </div>
              <div>
                <p>Followers</p>
                <p>{user?.followers?.length}</p>
              </div>
              <div>
                <p>Following</p>
                <p>{user?.following?.length}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-5 px-3">
            <div>Bio</div>
            <div className="flex space-x-3 ">
              {loggedInUser?.id !== user.id ? (
                <>
                  <button
                    onClick={handleFollow}
                    className="bg-cyan-500 font-semibold text-gray-100 text-base rounded w-52   py-1"
                  >
                    {user?.followers?.find(
                      (i) => i.followingId === loggedInUser.id
                    )
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                </>
              ) : (
                <div className="flex space-x-2">
                  <button className="bg-cyan-500 font-semibold text-gray-100 text-base rounded w-52   py-1">
                    Share profile
                  </button>
                  <button className="bg-cyan-500 font-semibold text-gray-100 text-base rounded w-52 flex space-x-2 justify-center  py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 stroke-white "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    <p>Edit profile</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2  mt-5 items-center">
        {user?.Post?.map((i, key) => (
          <div
            key={key}
            className="border border-zinc-700 h-48 w-full hover:scale-[0.988] rounded transition ease-in-out duration-300 cursor-pointer"
          >
            <img src={i.media} />
            {/* <div>{i.caption}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

profile.Layout = AuthLayout;
