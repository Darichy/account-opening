import React, { useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/layouts/AuthLayout";
import { Collapse, Menu } from "@mantine/core";
import { Avatar, Indicator } from "@mantine/core";

export default function Dropdown({ logout }) {
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
            <Menu.Item>
              <div className="flex space-x-2 items-center">
                <img src="/user.png" className="w-6 h-6" />
                <div>My Profile</div>
              </div>
            </Menu.Item>
          </Link>

          <div
            onClick={() => {
              console.log("clicked");
              logout();
            }}
          >
            <Menu.Item>
              <div className="flex space-x-2 items-center">
                <img src="/logout.png" className="w-6 h-6" />
                <div>Logout</div>
              </div>
            </Menu.Item>
          </div>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}
