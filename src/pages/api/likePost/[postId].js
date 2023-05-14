import nc from "next-connect";
import db from "@/pages/models";

const handler = nc();

handler.post(async (req, res) => {
  const { postId } = req.query;
  // console.log(postId);
  const isLiked = await db.Like.findOne({
    where: {
      postId: postId,
    },
  });
  // console.log(isLiked);
  if (!isLiked) {
    const like = await db.Like.create({
      userId: req.body.userId,
      postId,
    });
  } else {
    const unlike = await db.Like.destroy({
      where: {
        id: isLiked.dataValues.id,
      },
    });
    console.log("ghaa", unlike);
  }

  // res.send("post liked");
});
export default handler;
