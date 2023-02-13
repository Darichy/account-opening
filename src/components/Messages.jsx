import React from "react";
import { motion } from "framer-motion";

export default function Messages() {
  return (
    <motion.div
      initial={{ x: 60 }}
      animate={{ x: -2 }}
      className="absolute z-40 bg-slate-800 w-1/5 right-0  transition ease-in-out duration-100"
    >
      Messages
    </motion.div>
  );
}
