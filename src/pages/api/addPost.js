import nc from "next-connect";
import multer from "multer";
import Post from "../models/Post";
import db from "../models";

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
let path;
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(
        null,
        `${file.mimetype.split("/")[0]}-${
          file.originalname
        }-${Date.now()}-${extension}`
      );
    },
  }),
});
const handler = nc();
handler.use(upload.single("media"));
handler.post(async (req, res) => {
  console.log("here");
  if (req.file || req.body) {
    // res.send({ caption: req.body.caption });

    console.log(req.body, req.file);

    const post = await db.Post.create({
      userId: req.body.userId,
      caption: req.body.caption,
      media: req.file.path.replaceAll("\\", "/").replace("public", ""),
    });
    res.send("Post created successfully");
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
