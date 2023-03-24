import React from "react";
import { motion } from "framer-motion";

export default function Notifications() {
  return (
    <motion.div
      initial={{ x: 60, visibility: "hidden" }}
      animate={{ x: 0, visibility: "visible" }}
      className=" z-40 bg-zinc-800 w-[85%]  "
    >
      Notification
    </motion.div>
  );
}
