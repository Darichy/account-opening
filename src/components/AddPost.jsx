import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

export default function AddPost() {
  const [preview, setPreview] = useState(null);
  async function mediaPreview(e) {
    if (e.target.files) {
      setPreview(e.target.files[0]);
    }
    console.log(preview, "preview");
    // return console.log(URL.createObjectURL(preview));
  }

  function handlePost() {}
  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 50 }}
      //   exit={{ y: -50 }}
      className="absolute bg-zinc-800 rounded-sm  py-1 z-40 shadow-sm shadow-gray-500 w-[50%]"
    >
      {preview?.type.match(/image.*/) && (
        <img src={URL.createObjectURL(preview)} />
      )}
      {preview?.type.match(/video.*/) && (
        <video controls autoPlay src={URL.createObjectURL(preview)}></video>
      )}

      <textarea
        name=""
        id=""
        cols="30"
        rows="4"
        className="w-full py-0.5 focus:outline-none ring-inset rounded px-3 bg-black focus:bg-black focus:ring-1 focus:ring-cyan-400"
        autoFocus
      ></textarea>
      <div className="flex justify-between">
        <label
          htmlFor="file"
          className="cursor-pointer text-cyan-500 hover:text-cyan-300 px-3 py-2"
        >
          Select media
          <input type="file" id="file" hidden onChange={mediaPreview} />
        </label>
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
