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
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import moment from "moment/moment";
import { useContext } from "react";
import { AuthContext } from "../../layouts/AuthLayout";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function dashboard({ posts }) {
  // const { posted } = useContext(AuthContext);
  const { postRefetch } = useSelector((state) => state.post);
  const [allPost, setAllPost] = useState(posts);
  const isMounted = useRef(false);
  const [inspectPost, setInspectPost] = useState(false);
  const [post, setPost] = useState("");

  useEffect(() => {
    if (isMounted.current) {
      axios.get("http://localhost:8080/api/getPosts").then((response) => {
        console.log(response);
        setAllPost(response.data);
      });
      console.log("Component re-rendered");
    } else {
      // This block of code will run on the initial render
      console.log("Component mounted");
      isMounted.current = true;
    }
  }, [postRefetch]);

  console.log({ postRefetch });

  const handleFetchPost = async (id) => {
    setInspectPost(true);
    const response = await axios.get(`http://localhost:8080/api/getPost/${id}`);
    console.log(response, "res");
    setPost(response.data);
  };

  if (!allPost) {
    return <Loader />;
  }

  // console.log(post, "post");
  console.log(allPost, "kdlfkl");
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
        <div className="flex justify-center mb-3">
          <div className="relative w-1/2">
            <input
              type="text"
              className="bg-zinc-900 focus:bg-black w-full  shadow shadow-gray-700 rounded-full text-sm py-[8px] mt-3 pl-14  focus:outline-0 ring-2 ring-inset  ring-cyan-500"
              placeholder="Search here ..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[18px] h-[18px] stroke-slate-500 absolute top-[23px] left-5"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 items-center">
          {allPost.map((i, key) => (
            <div
              key={key}
              className="border border-zinc-700 h-48 w-full hover:scale-[1.025] flex justify-center items-center rounded transition ease-in-out duration-300 cursor-pointer"
            >
              <Image
                src={i.media}
                width={100}
                height={100}
                objectFit="cover"
                objectPosition="center"
                className="w-full h-auto"
              />
              {/* <div>{i.caption}</div> */}
            </div>
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
