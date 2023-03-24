import React from "react";
import { Quicksand } from "@next/font/google";
import NavBar from "../components/NavBar";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-quicksand",
});

export default function Layout({ children }) {
  // const childrenWithProps = React.Children.map(children, (child) => {
  //   // Checking isValidElement is the safe way and avoids a
  //   // typescript error too.
  //   if (React.isValidElement(child)) {
  //     return React.cloneElement(child, { getLoggedInUser });
  //   }
  //   return child;
  // });
  return (
    <>
      <div
        className={`${quicksand.className} h-screen  overflow-clip bg-zinc-800 text-gray-100`}
      >
        {children}
      </div>
    </>
  );
}
