import nc from "next-connect";
import db from "@/pages/models";
import { prisma } from "prisma/db/config";

const handler = nc();

handler.delete(async (req, res) => {
  const { postId } = req.query;

  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    res.send("Post deleted successfully");
  } catch (error) {
    console.log(error);
  }
});
export default handler;
