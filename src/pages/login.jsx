import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { Modal } from "@mantine/core";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(false);

  const router = useRouter();
  function toRegister() {
    router.push("/register");
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (formData.username === "" || formData.password === "") {
      setAlert({
        status: true,
        message: "Please fill out all fields",
        header: "All Fields are required",
      });
    } else {
      try {
        console.log("adey");
        const response = await axios.post("/api/login", formData);
        console.log(response, "from Login");
        if (response.status == 204) {
          return setAlert({
            status: true,
            message: "Check your internet connection :(",
            header: "Network Error",
          });
        }
        router.push(`/${response.data.user.username}/dashboard`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const closeAlert = () => {
    setAlert(false);
  };
  return (
    <div className=" w-full transform scale-90 h-full flex flex-col justify-center items-center overflow-hidden">
      <Modal
        opened={alert.status}
        onClose={closeAlert}
        title={<div className="text-red-500">{alert.header}</div>}
        centered
      >
        <div className="flex flex-col space-y-4 items-center justify-center">
          <div>
            <img className="w-16 h-16" src={"/error.png"} />
          </div>
          <hr />
          <div className="text-lg">{alert.message}</div>
        </div>
      </Modal>
      <div className="w-[33%] bg-zinc-900 rounded h-[65%] relative px-4 mb-7 ">
        <h1 className="bg-cyan-400 absolute font-semibold -top-4 left-[40%] right-[40%] text-center px-1 py-2  rounded">
          <p className="flex text-black font-extrabold">
            Dari
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-zinc-900 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
              />
            </svg>
            Chat
          </p>
        </h1>
        <div className="mt-16  mb-8 text-white flex flex-col font-semibold">
          <span className="text-2xl mb-2 font-bold">Ready to connect ??</span>
          <span> Welcome to the Dashboard of Darichat</span>
        </div>
        <form className="px-8 flex flex-col items-center">
          <input
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            name="username"
            type="text"
            className="w-full h-[3rem]  mb-2 rounded-sm text-cyan-400  bg-black  focus:border-cyan-400 px-5 focus:outline-none focus:border"
            placeholder="Username"
          />

          <input
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            name="password"
            type="password"
            className="w-full h-[3rem] mb-4  rounded-sm text-cyan-400  bg-black focus:border-cyan-400 px-5 focus:outline-none focus:border"
            placeholder="Password"
          />

          <button
            onClick={handleLogin}
            className="bg-cyan-400 mb-4 w-full h-12 rounded-sm text-lg  font-semibold  px-3 py-1 "
          >
            SIGN IN
          </button>

          <button className="border border-gray-500 rounded-sm text-white font-medium px-2 py-1">
            FORGOT PASSWORD?
          </button>
        </form>
      </div>
      <button
        onClick={toRegister}
        className="w-[33%] border border-gray-500 bg-black text-cyan-400 font-medium px-2 py-2 rounded-sm"
      >
        CREATE AN ACCOUNT
      </button>
    </div>
  );
}

export default Login;

// export async function getServerSideProps({ req, res }) {
//   const objex = getGh();

//   return {
//     props: {
//       objex,
//     },
//   };
// }
