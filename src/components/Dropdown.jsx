import React, { useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/layouts/AuthLayout";
import { Collapse, Menu } from "@mantine/core";
import { Avatar, Indicator } from "@mantine/core";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const { loggedInUser } = useContext(AuthContext);

  return (
    <Menu transition="rotate-right" transitionDuration={150}>
      <Menu.Target>
        <button
        // onClick={() => {
        //   // setOpen(!open);
        // }}
        >
          <Indicator
            dot
            inline
            size={16}
            offset={7}
            position="bottom-end"
            color="green"
            withBorder
          >
            <Avatar
              size="md"
              radius="xl"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            />
          </Indicator>
        </button>
      </Menu.Target>
      <Menu.Dropdown className="absolute w-64 z-50  right-2 rounded-sm">
        <div className="bg-white w-64">
          <Link href={`/${loggedInUser.username}/profile`} className="w-full">
            <Menu.Item>Profile</Menu.Item>
          </Link>

          <Menu.Item
            icon={
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            }
          >
            Log out
          </Menu.Item>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}
