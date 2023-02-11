import React from "react";
import { Quicksand } from "@next/font/google";
import NavBar from "./NavBar";
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-quicksand",
});

export default function Layout({ children }) {
  return (
    <>
      <div
        className={`${quicksand.className} h-screen bg-zinc-800 text-gray-100`}
      >
        <NavBar />

        {children}
      </div>
    </>
  );
}
