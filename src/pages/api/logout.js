import { sign } from "jsonwebtoken";
import nc from "next-connect";
import db from "../models";
import { serialize } from "cookie";

const handler = nc();

// handler.use((req) => {
//   console.log(req.url);
// });

handler.post(async (req, res) => {
  try {
    // return console.log(req.url);
    if (req.cookies.refreshToken) {
      res.setHeader("Set-Cookie", [
        serialize("refreshToken", null, {
          httpOnly: true,
          maxAge: 0,
          sameSite: "strict",
          path: "/",
        }),
        serialize("accessToken", null, {
          httpOnly: true,
          maxAge: 0,
          sameSite: "strict",
          path: "/",
        }),
      ]);

      res.send("Logout successfully");
    }
  } catch (err) {
    console.log(err);
  }
});

export default handler;
