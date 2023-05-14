import nc from "next-connect";
import db from "@/pages/models";
import { prisma } from "prisma/db/config";

const handler = nc();

handler.get(async (req, res) => {
  console.log("hfhfh");
  const { postId } = req.query;
  console.log(postId);
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (post) {
      res.send(post);
    } else {
      res.send("No post found");
    }
  } catch (error) {
    console.log(error);
  }
});
export default handler;
