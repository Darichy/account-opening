import React from "react";

export default function NavBar() {
  return (
    <div className="w-full flex justify-between text-gray-100 py-2 px-3">
      <div className="flex items-center w-1/2">
        <p>DariChat</p>
        <input
          type="text"
          className="bg-zinc-600 ml-3 rounded py-1 px-3 w-[40%] focus:outline-0 focus:ring-2 ring-inset  focus:ring-cyan-500"
          placeholder="Search for something"
        />
      </div>
      <div>
        <ul className="flex">
          <li className="mr-5 cursor-pointer hover:text-cyan-500 hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold ">
            Home
          </li>
          <li className="mr-5 cursor-pointer hover:text-cyan-500 hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold">
            My Network
          </li>
          <li className="mr-5 cursor-pointer hover:text-cyan-500 hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold">
            Messages
          </li>
          <li className="mr-5 cursor-pointer hover:text-cyan-500 hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold">
            Notification
          </li>
          <li className="mr-5 cursor-pointer hover:text-cyan-500 hover:transform hover:scale-110 transition ease-in-out duration-150 hover:font-semibold">
            Messages
          </li>
        </ul>
      </div>
    </div>
  );
}
