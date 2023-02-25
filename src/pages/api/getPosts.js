import nc from "next-connect";
import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import Post from "../models/Post";
import db from "../models";
import User from "../models/User";

dotenv.config();
const handler = nc();

export async function getAllPosts() {
  const posts = await db.Post.findAll({
    include: [
      {
        model: db.User,
        attributes: ["id", "username", "profilePic"],
      },
    ],
  });
  return posts;
}
handler.get(async (req, res) => {
  console.log("kk");
  const posts = await getAllPosts();

  res.send(posts);
});
export default handler;
