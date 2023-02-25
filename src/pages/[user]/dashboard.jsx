import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { verify } from "jsonwebtoken";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { getAllPosts } from "../api/getPosts";
import AuthLayout from "../../layouts/AuthLayout";
import PostCard from "@/components/PostCard";

export default function dashboard({ posts }) {
  console.log(posts);
  return (
    <>
      <div>
        {posts.map((i) => (
          <div className="text-white">
            <PostCard
              user={i.user}
              caption={i.caption}
              media={i.media}
              createdAt={i.createdAt}
            />
          </div>
        ))}
      </div>
    </>
  );
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

export async function getServerSideProps() {
  const posts = await getAllPosts();
  console.log(JSON.parse(JSON.stringify(posts)));
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
