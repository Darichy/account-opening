import React from "react";
import Dropdown from "./Dropdown";
import Link from "next/link";
import { AuthContext } from "../layouts/AuthLayout";
import { useContext } from "react";

export default function NavBar({ user, asPath, logout }) {
  const { toggleSliders } = useContext(AuthContext);
  console.log(user, "user");

  return (
    <div className="w-full flex justify-between text-gray-100 py-2 px-3">
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
          className="bg-zinc-600 focus:bg-black ml-3 rounded py-1 px-3 md:w-[40%]  w-[85%] focus:outline-0 focus:ring-2 ring-inset  focus:ring-cyan-500"
          placeholder="Search for something"
        />
      </div>
      <div>
        <ul className="flex items-center">
          <Link
            href={`/${user.username}/dashboard`}
            className="mr-5 flex space-x-1 cursor-pointer hover:text-cyan-500 hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold "
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
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
              />
            </svg>

            <p className="hidden md:block">Home</p>
          </Link>
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
            <div className="hidden md:block">{"@" + user.username}</div>
            <div>
              <Dropdown logout={logout} />
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}
