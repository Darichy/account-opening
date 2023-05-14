import nc from "next-connect";
import db from "@/pages/models";
import { prisma } from "prisma/db/config";

const handler = nc();

handler.get(async (req, res) => {
  const { userId } = req.query;
  console.log(req.params, userId);
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
    });

    if (posts) {
      res.send(posts);
    } else {
      res.send("No post found");
    }
  } catch (error) {
    console.log(error);
  }
});
export default handler;
