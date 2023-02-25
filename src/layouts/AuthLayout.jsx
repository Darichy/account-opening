import { createContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useRouter } from "next/router";
import Notifications from "../components/Notifications";
import Messages from "../components/Messages";
import AddPost from "../components/AddPost";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthLayout({ children }) {
  const [dateState, setDateState] = useState(new Date());

  const [openSliders, setOpenSliders] = useState({
    messages: false,
    notifications: false,
    addPost: false,
  });
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);

    const fetchLoggedUser = async () => {
      try {
        const response = await axios.get("/api/getloggedinuser");
        setLoggedInUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLoggedUser();
  }, []);

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
    <AuthContext.Provider
      value={{ toggleSliders: toggleSliders, loggedInUser }}
    >
      <div className="w-full h-full  overflow-x-hidden">
        {loggedInUser && <NavBar user={loggedInUser} asPath={asPath} />}
        <div className="bg-black">
          <div className="flex text-white ">
            <SideBar />
            <div className="w-3/5 max-h-screen overflow-y-auto  px-3 mx-auto relative ">
              {openSliders.addPost && <AddPost toggleSliders={toggleSliders} />}
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
