import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import ChatBox from "./ChatBox";
import MyTabs from "./MyTabs";
import Chats from "./Chats";
import { Dialog } from "@mantine/core";

export default function Messages({ isOpen, setOpenSliders }) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    // console.log(drawerRef.current);
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setOpenSliders((prev) => ({
          ...prev,
          messages: false,
        }));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerRef]);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }, [open]);
  // const { loggedInUser } = useSelector((state) => state.user);
  // console.log({ loggedInUser });
  return (
    // <motion.div
    //   initial={{ x: 60 }}
    //   animate={{ x: 0 }}
    //   className=" z-40  absolute  w-full h-[90vh]"
    // >
    //   <Dialog
    //     transition="scale-x"
    //     position={{ top: 20, left: 20 }}
    //     opened={open}
    //   >
    //     hhh
    //   </Dialog>

    // </motion.div>

    <div
      ref={drawerRef}
      className={`fixed top-0 right-0 bg-zinc-800 h-[92vh] mt-16 w-[25%] border-l border-l-zinc-600 rounded-l-md shadow transition ease-in-out duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="px-2">
        <div className="flex justify-between">
          <p>Chats</p>
          <div className="flex space-x-1 py-2">
            <svg
              onClick={() => setOpen(true)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="relative my-3">
          <input
            type="text"
            className="bg-zinc-900 focus:bg-black w-full  rounded py-[6px] mt-3 pl-7  focus:outline-0 focus:ring-2 ring-inset  focus:ring-cyan-500"
            placeholder="Search here ..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[18px] h-[18px] stroke-slate-500 absolute top-[19px] left-1"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <MyTabs />
      </div>
    </div>
  );
}
