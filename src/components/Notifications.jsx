import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import ChatBox from "./ChatBox";
import MyTabs from "./MyTabs";
import Chats from "./Chats";
import { Dialog } from "@mantine/core";

export default function Notification({ isOpen, setOpenSliders }) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    // console.log(drawerRef.current);
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setOpenSliders((prev) => ({
          ...prev,
          notifications: false,
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
      <div className="font-semibold">Notifications</div>
    </div>
  );
}
