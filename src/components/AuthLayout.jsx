import { createContext, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useRouter } from "next/router";
import Notifications from "./Notifications";
import Messages from "./Messages";
import AddPost from "./AddPost";

export const AuthContext = createContext();

export default function AuthLayout({ children, data }) {
  const [openSliders, setOpenSliders] = useState({
    messages: false,
    notifications: false,
    addPost: false,
  });
  function toggleSliders(slider) {
    Object.keys(openSliders).map((i) => {
      setOpenSliders((prev) => ({
        ...prev,
        [i]: false,
        [slider]: !prev[slider],
      }));
    });
  }
  const router = useRouter();
  const { asPath } = router;
  return (
    <AuthContext.Provider value={{ toggleSliders: toggleSliders }}>
      <div className="w-screen  overflow-x-hidden">
        <NavBar user={data} asPath={asPath} />
        <div className=" h-screen bg-black">
          <div className="flex text-white ">
            <SideBar />
            <div className="w-3/5 px-3 relative ">
              {openSliders.addPost && <AddPost />}
              {children}
            </div>
            {openSliders.notifications && <Notifications />}
            {openSliders.messages && <Messages />}

            <div className="bg-zinc-700 fixed right-0">.hjshjshd</div>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
