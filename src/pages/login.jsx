import { getGh } from "./api/login";
import { useRouter } from "next/router";
import { useState } from "react";

function Login({ objex }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  function toRegister() {
    router.push("/register");
  }
  return (
    <div className=" w-full transform scale-90 h-full flex flex-col justify-center items-center overflow-hidden">
      <div className="w-[33%] bg-zinc-900 rounded h-[65%] relative px-4 mb-7 ">
        <h1 className="bg-cyan-400 absolute font-semibold -top-4 left-[40%] right-[40%] text-center  py-2  rounded">
          DARICHAT
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

          <button className="bg-cyan-400 mb-4 w-full h-12 rounded-sm text-lg  font-semibold  px-3 py-1 ">
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

export async function getServerSideProps({ req, res }) {
  const objex = getGh();
  console.log(objex);
  return {
    props: {
      objex,
    },
  };
}
