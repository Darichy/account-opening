// import { getGh } from "./api/login";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

function Register({ objex }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    password: false,
    email: false,
  });

  console.log(formData);
  const router = useRouter();

  function toLogin() {
    router.push("/login");
  }

  function validate() {
    const mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if (formData.email.match(mailformat)) {
      setError((prev) => ({ ...prev, email: false }));
    } else {
      setError((prev) => ({ ...prev, email: true }));
    }
  }

  function validateRegister() {
    if (formData.confirmPassword.length >= formData.password.length) {
      if (!(formData.confirmPassword === formData.password)) {
        setError((prev) => ({ ...prev, password: false }));
      } else {
        setError((prev) => ({ ...prev, password: true }));
      }
    }
  }
  let loader = false;
  async function handleRegisterSubmit(e) {
    e.preventDefault();
    loader = true;
    const { username, password, email } = formData;
    if (username && password && email) {
      try {
        const { confirmPassword, ...others } = formData;
        const response = await axios.post("api/register", others);
        console.log(response);
        // loader = false;
        router.push("/login");
      } catch (error) {
        console.log(error);
        loader = false;
      }
    } else {
      loader = false;
      console.log("All fields are required");
    }
  }

  return (
    <div className="w-screen transform scale-90 h-screen flex flex-col justify-center relative items-center overflow-hidden">
      {loader && <Loader />}
      <div className="w-[33%] bg-zinc-900 rounded h-[75%] relative px-4 mb-7 ">
        <h1 className="bg-cyan-400 absolute font-semibold -top-4 left-[40%] right-[40%] text-center  py-2  rounded">
          DARICHAT
        </h1>
        <div className="mt-16  mb-8 text-white flex flex-col font-semibold">
          <span className="text-2xl mb-2 font-bold">Ready to connect ??</span>
          <span> Welcome to the Dashboard of Darichat</span>
        </div>
        <form
          className="px-8 flex flex-col items-center"
          onSubmit={handleRegisterSubmit}
        >
          <input
            name="username"
            value={formData.username}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            type="text"
            className="w-full h-[3rem]  mb-2 rounded-sm text-cyan-400  bg-black  focus:outline-cyan-400 px-5 focus:outline-2"
            placeholder="Username"
          />
          <input
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
              validate();
            }}
            type="email"
            className={`${
              error.email ? "border-red-500 border" : "focus:border-cyan-400"
            } w-full h-[3rem] mb-4  rounded-sm text-cyan-400  bg-black focus:outline-none  px-5 focus:border`}
            placeholder="Email"
          />
          <input
            name="password"
            value={formData.password}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            type="password"
            className="w-full h-[3rem] mb-2  rounded-sm text-cyan-400  bg-black focus:outline-none focus:border-cyan-400 px-5 focus:border"
            placeholder="Password"
          />
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
              validateRegister();
            }}
            type="password"
            className={`${
              error.password ? "border-red-500 border" : "focus:border-cyan-400"
            } w-full h-[3rem] mb-4  rounded-sm text-cyan-400  bg-black focus:outline-none  px-5 focus:border`}
            placeholder="Confirm Password"
          />
          <button className="bg-cyan-400 mb-4 w-full h-12 rounded-sm text-lg  font-semibold  px-3 py-1 ">
            SIGN UP
          </button>

          <button className="border border-gray-500 rounded-sm text-white font-medium px-2 py-1">
            SIGN UP WITH GOOGLE
          </button>
        </form>
      </div>
      <button
        onClick={toLogin}
        className="w-[33%] border border-gray-500 bg-black text-cyan-400 font-medium px-2 py-2 rounded-sm"
      >
        BACK TO LOGIN
      </button>
    </div>
  );
}

export default Register;

// export async function getServerSideProps() {
//   const objex = getGh();
//   console.log(objex);
//   return {
//     props: {
//       objex,
//     },
//   };
// }
