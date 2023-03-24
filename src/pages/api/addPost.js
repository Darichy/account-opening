import nc from "next-connect";
import multer from "multer";
import Post from "../models/Post";
import db from "../models";
import { verify } from "jsonwebtoken";

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
  // return console.log(req.file, req.body);
  if (req.file || req.body) {
    console.log("here");
    // res.send({ caption: req.body.caption });

    console.log(req.body, req.file);

    const user = verify(req.cookies.refreshToken, process.env.SECRET_KEY);
    // return console.log(user);
    const post = await db.Post.create({
      userId: user.id,
      caption: req.body.caption ? req.body.caption : "",
      media: req.file
        ? req.file.path.replaceAll("\\", "/").replace("public", "")
        : "",
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
