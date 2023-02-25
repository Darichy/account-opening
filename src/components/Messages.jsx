import React from "react";
import { motion } from "framer-motion";

export default function Messages() {
  return (
    <motion.div
      initial={{ x: 60 }}
      animate={{ x: 0 }}
      className=" z-40 bg-slate-800 w-1/5 right-0 "
    >
      Messages
    </motion.div>
  );
}
