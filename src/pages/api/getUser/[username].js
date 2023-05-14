import nc from "next-connect";
import { prisma } from "prisma/db/config";

const handler = nc();

handler.get(async (req, res) => {
  // console.log("laks");
  const { username } = req.query;
  console.log(username);
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
      include: {
        Post: {
          select: {
            id: true,
            media: true,
          },
        },
        followers: {
          select: {
            id: true,
            followerId: true,
            followingId: true,
          },
        },
        following: {
          select: {
            id: true,
            followerId: true,
            followingId: true,
          },
        },
      },
    });

    if (user) {
      res.send(user);
    } else {
      res.send("No user found");
    }
  } catch (error) {
    console.log(error);
  }
});
export default handler;
