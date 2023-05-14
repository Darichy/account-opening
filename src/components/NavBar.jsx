import React from "react";
import Dropdown from "./Dropdown";
import Link from "next/link";
import { AuthContext } from "../layouts/AuthLayout";
import { useContext } from "react";
import { useSelector } from "react-redux";

export default function NavBar({ asPath, logout }) {
  const { toggleSliders } = useContext(AuthContext);
  const { loggedInUser } = useSelector((state) => state.user);

  return (
    <div className="w-full fixed top-0 bg-zinc-800 border border-zinc-600 flex justify-between text-gray-100 py-2 px-3">
      <div className="flex items-center w-[70%] md:w-1/2">
        <p className="flex font-medium">
          Dari
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-cyan-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
            />
          </svg>
          Chat
        </p>

        <input
          type="text"
          className="bg-zinc-600 block md:hidden focus:bg-black ml-3 rounded py-1 px-3 md:w-[40%]  w-[85%] focus:outline-0 focus:ring-2 ring-inset  focus:ring-cyan-500"
          placeholder="Search for something"
        />
      </div>
      <div>
        <ul className="flex items-center">
          <li
            onClick={() => toggleSliders("addPost")}
            className="mr-5 flex space-x-1 hover:text-cyan-500 cursor-pointer hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>

            <p className="hidden md:block">Add Post</p>
          </li>
          <li
            onClick={() => toggleSliders("messages")}
            className="mr-5 cursor-pointer flex space-x-1 hover:text-pink-600 hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold"
          >
            <img src={"/chat.png"} className="h-6 w-6" />

            <p className="hidden md:block">Chats</p>
          </li>
          <li
            onClick={() => toggleSliders("notifications")}
            className="mr-5 cursor-pointer flex space-x-1 hover:text-cyan-500 hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold"
          >
            <img src={"/notification-bell.png"} className="h-6 w-6" />
            <p className="hidden md:block">Notification</p>
          </li>
          <div className="ml-5 flex items-center  rounded space-x-1  cursor-pointer text-cyan-500  font-semibold hover:text-cyan-400 transition ease-in-out duration-150 hover:font-semibold">
            <div className="hidden md:block">
              {"@" + loggedInUser?.username}
            </div>
            <div>
              <Dropdown logout={logout} />
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}
