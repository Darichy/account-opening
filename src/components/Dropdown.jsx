import { Collapse } from "@mantine/core";
import React, { useState } from "react";
import Link from "next/link";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setOpen(!open);
        }}
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
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </button>
      <Collapse
        in={open}
        className="absolute w-48 z-50 bg-purple-500 right-2 rounded-sm"
      >
        <ul className="w-full">
          <li className="w-full">
            <Link href="/darichy/profile" className="w-full">
              Profile
            </Link>
          </li>
          <li>Log out</li>
        </ul>
      </Collapse>
    </div>
  );
}
