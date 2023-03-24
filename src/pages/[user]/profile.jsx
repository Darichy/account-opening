import React, { useContext } from "react";
import { AuthContext } from "@/layouts/AuthLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { verify } from "jsonwebtoken";
import { getAllPosts } from "../api/getPosts";
import PostCard from "@/components/PostCard";

export default function profile({ posts }) {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <div className="w-full   ">
      <div className="bg-zinc-800">
        <div
          className="h-48 bg-blue-600 relative bg-contain bg-center"
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

        <div className="mt-[3.1rem] px-7 ">
          <div className="font-bold text-xl flex justify-between">
            <p>{loggedInUser?.username}</p>
            <div className="flex space-x-3">
              <button className="bg-[#8ec1fbb8] text-blue-800 text-base rounded border-2 border-blue-800 px-3 py-1">
                Follow
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 p-1 rounded stroke-white bg-[#5cb6e07c]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between px-24">
            <div>Bio</div>
            <div className="grid grid-cols-3 gap-5 text-center">
              <div className="text-center">
                <p>Posts</p>
                <p>212</p>
              </div>
              <div>
                <p>Followers</p>
                <p>212</p>
              </div>
              <div>
                <p>Following</p>
                <p>212</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2  mt-5 items-center">
        {posts.map((i, key) => (
          <div
            key={key}
            className="border h-48 w-full hover:scale-[1.025] rounded transition-all"
          >
            <img src={i.media} />
            <div>{i.caption}</div>
          </div>
          //   key={key}
          //   id={i.id}
          //   postLikes={i.likes.length}
          //   user={i.user}
          //   caption={i.caption}
          //   media={i.media}
          //   createdAt={i.createdAt}
          // />
        ))}
      </div>
    </div>
  );
}

profile.Layout = AuthLayout;

export async function getServerSideProps(context) {
  let loggedInUserId;
  // console.log(context.cookie, "cookies");
  // if (context.cookies.refreshToken) {
  //   verify(
  //     req.cookies.refreshToken,
  //     process.env.SECRET_KEY,
  //     async (error, results) => {
  //       if (results) {
  //         loggedInUserId = results.id;
  //       }
  //     }
  //   );
  // }
  const posts = await getAllPosts(loggedInUserId);

  // console.log(JSON.parse(JSON.stringify(posts)));
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
