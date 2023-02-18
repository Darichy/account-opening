import React from "react";
import Dropdown from "./Dropdown";
import Link from "next/link";
import { AuthContext } from "../layouts/AuthLayout";
import { useContext } from "react";

export default function NavBar({ user, asPath }) {
  const { toggleSliders } = useContext(AuthContext);
  console.log(user, "user");
  return (
    <div className="w-full flex justify-between text-gray-100 py-2 px-3">
      <div className="flex items-center w-1/2">
        <p>DariChat</p>

        <input
          type="text"
          className="bg-zinc-600 focus:bg-black ml-3 rounded py-1 px-3 w-[40%] focus:outline-0 focus:ring-2 ring-inset  focus:ring-cyan-500"
          placeholder="Search for something"
        />
      </div>
      <div>
        <ul className="flex">
          <li className="mr-5 cursor-pointer hover:text-cyan-500 hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold ">
            <Link href={`/${user.username}/dashboard`}>Home</Link>
          </li>
          <li
            onClick={() => toggleSliders("addPost")}
            className="mr-5  hover:text-cyan-500 cursor-pointer hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold"
          >
            Add Post
          </li>
          <li
            onClick={() => toggleSliders("messages")}
            className="mr-5 cursor-pointer hover:text-cyan-500 hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold"
          >
            Messages
          </li>
          <li
            onClick={() => toggleSliders("notifications")}
            className="mr-5 cursor-pointer hover:text-cyan-500 hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold"
          >
            Notification
          </li>
          <li className="mr-5 cursor-pointer text-cyan-500  font-semibold hover:text-cyan-400 transition ease-in-out duration-150 hover:font-semibold">
            {asPath?.includes("darichy") ? "@" + user.username : ""}
          </li>
          <Dropdown />
        </ul>
      </div>
    </div>
  );
}
