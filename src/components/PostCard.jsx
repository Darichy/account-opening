import moment from "moment/moment";
import { useEffect, useState } from "react";

export default function PostCard({ caption, media, createdAt, user }) {
  return (
    <>
      <div className="w-[55%] mb-4 h-[400px]  rounded-sm bg-zinc-700 text-white">
        <div className="flex justify-between">
          <div>{user.username}</div>
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
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        <img src={media} alt="" />
        <div className="w-full">ghana</div>
        {caption}
        <p className="text-sm">{moment(createdAt).fromNow()}</p>
      </div>
    </>
  );
}
