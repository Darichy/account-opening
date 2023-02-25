import { useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { Dropzone } from "@mantine/dropzone";
import { Text } from "@mantine/core";
import { AuthContext } from "@/layouts/AuthLayout";

export default function AddPost({ toggleSliders }) {
  const [post, setPost] = useState(null);

  async function handlePost(e) {
    e.preventDefault();
    console.log("clicked");
    const response = await axios.get("http://localhost:8080/api/getPosts");
    console.log(response);
    // try {
    //   console.log("adey");
    //   const response = await axios.post("/api/login", post);
    //   console.log(response);
    //   router.push(`/${response.data.user.username}/dashboard`);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 50 }}
      className="absolute bg-zinc-800 rounded-sm  py-1 z-40 shadow-sm shadow-gray-500 w-[50%]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 absolute top-2 right-4 cursor-pointer"
        onClick={() => toggleSliders("addPost")}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <div className="text-white font-semibold">New Post</div>
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
          className="bg-black border border-dashed border-cyan-500 hover:bg-black"
        >
          <Dropzone.Accept>
            <p className="text-green-700 bg-black">Yes</p>
            {/* <IconUpload
              size={50}
              stroke={1.5}
              color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
            /> */}
          </Dropzone.Accept>
          <Dropzone.Reject>
            <p className="text-red-700">No</p>

            {/* <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            /> */}
          </Dropzone.Reject>

          <div className="flex justify-center items-center text-cyan-500">
            Drop file here
          </div>
        </Dropzone>
      )}
      {/* Select media
        <input type="file" id="file" hidden onChange={mediaPreview} />
      </label> */}
      <textarea
        name="caption"
        onChange={(e) => {
          console.log(post);
          setPost((prev) => ({ ...prev, caption: e.target.value }));
        }}
        cols="30"
        rows="4"
        className="caption w-full py-0.5 focus:outline-none ring-inset rounded px-3 bg-black focus:bg-black "
        autoFocus
      ></textarea>
      <div className="flex justify-between">
        <button
          onClick={handlePost}
          className="bg-blue-500 px-3 font-semibold rounded py-2"
        >
          Add Post
        </button>
      </div>
    </motion.div>
  );
}
