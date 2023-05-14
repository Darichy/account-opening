import nc from "next-connect";
import { prisma } from "prisma/db/config";
const handler = nc();

export default handler.post(async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    // return res.send(req.body);
    // const isFollowin = await prisma.follow.findMany();
    // return res.send(isFollowin);
    const isFollowing = await prisma.follow.findFirst({
      where: { followerId, followingId },
    });
    if (isFollowing) {
      await prisma.follow.delete({ where: { id: isFollowing.id } });
      return res.send("unfollowed");
    }
    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    return res.send("Followed");
  } catch (error) {
    console.log(error);
  }
});
