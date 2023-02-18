import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { verify } from "jsonwebtoken";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import AuthLayout from "../../layouts/AuthLayout";

export default function dashboard() {
  return <>Dashboard</>;
}

// export async function getServerSideProps({ req, res }) {
//   let payload;

//   if (req.cookies.refreshToken) {
//     payload = verify(req.cookies.refreshToken, process.env.SECRET_KEY);
//     console.log(payload);
//   }

//   return {
//     props: {
//       data: {
//         username: payload?.username,
//       },
//     },
//   };
// }

dashboard.Layout = AuthLayout;
