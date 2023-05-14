import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { Dropzone } from "@mantine/dropzone";
import { Text } from "@mantine/core";
import { AuthContext } from "@/layouts/AuthLayout";
import { useDispatch } from "react-redux";
import { setPostRefetch } from "@/store/postSlice";

export default function AddPost({ toggleSliders, isOpen, setOpenSliders }) {
  const [post, setPost] = useState({});
  const dispatch = useDispatch();

  async function handlePost(e) {
    const formData = new FormData();
    formData.append("media", post.media);
    formData.append("caption", post.caption);
    e.preventDefault();
    // console.log(formData, "hdhk");
    // console.log("clickeddd", post, formData);
    const response = await axios.post(
      "http://localhost:8080/api/addPost",
      formData
    );
    dispatch(setPostRefetch());
    console.log(response);
    // setPosted((prev) => !prev);

    setOpenSliders((prev) => ({
      ...prev,
      addPost: false,
    }));
  }

  const drawerRef = useRef(null);

  useEffect(() => {
    // console.log(drawerRef.current);
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setOpenSliders((prev) => ({
          ...prev,
          addPost: false,
        }));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerRef]);

  return (
    <div
      ref={drawerRef}
      className={`fixed top-0 left-1/3 z-50 bg-[whitesmoke] mt-16 w-[30%] text-zinc-900   border border-zinc-600 rounded-md shadow transition ease-in-out duration-300 transform ${
        isOpen ? "translate-y-0 opacity-100" : " -translate-y-full opacity-0"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 absolute top-2 right-4 cursor-pointer"
        onClick={() => {
          setOpenSliders((prev) => ({
            ...prev,
            addPost: false,
          }));
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <div className=" text-lg font-medium py-1 text-zinc-800">
        Create New Post
      </div>
      {post?.media?.type.match(/image.*/) && (
        <img src={URL.createObjectURL(post.media)} />
      )}
      {post?.media?.type.match(/video.*/) && (
        <video controls autoPlay src={URL.createObjectURL(post.media)}></video>
      )}

      {/* <label
        htmlFor="file"
        className="cursor-pointer border border-dashed w-72 h-64 text-cyan-500 hover:text-cyan-300 px-3 py-2"
      > */}
      {!post?.media && (
        <Dropzone
          accept={["image/*", "video/*"]}
          onDrop={(files) => {
            setPost((prev) => ({ ...prev, media: files[0] }));
          }}
          className="bg-gray-200 flex items-center border-2 mb-2 h-20 border-dashed border-cyan-500 "
        >
          <div className="flex space-x-4 justify-center items-center hover:text-cyan-300 text-cyan-500">
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
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            <p>Drop file here</p>
          </div>
        </Dropzone>
      )}
      {/* Select media
      </label> */}
      {/* <input
        type="file"
        id="file"
        onChange={(e) => console.log(e.target.files[0])}
      /> */}

      <textarea
        name="caption"
        onChange={(e) => {
          console.log(post);
          setPost((prev) => ({ ...prev, caption: e.target.value }));
        }}
        cols="30"
        rows="4"
        className="caption w-full py-0.5 focus:outline-none ring-inset rounded px-3  "
        autoFocus
        placeholder="Write a caption ..."
      ></textarea>
      <div className="flex justify-center">
        <button
          onClick={handlePost}
          className="bg-blue-500 px-3 font-semibold rounded py-1 w-1/2 text-white"
        >
          Add Post
        </button>
      </div>
    </div>
  );
}
