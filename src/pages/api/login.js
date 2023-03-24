import { compare, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import nc from "next-connect";
import db from "../models";
import dotenv from "dotenv";
dotenv.config();
import cookie, { serialize } from "cookie";
import { NextRequest } from "next/server";

const handler = nc();

// handler.use((req) => {
//   console.log(req.url);
// });

handler.post(async (req, res) => {
  try {
    // return console.log(req.url);
    db.sequelize.sync();

    const { username, password } = req.body;
    if (username && password) {
      const user = await db.User.findOne({
        where: {
          username,
        },
      });

      if (user) {
        if (compareSync(password, user.password)) {
          const accessToken = sign(
            { id: user.id, username: user.username },
            process.env.SECRET_KEY
          );

          const refreshToken = sign(
            { id: user.id, username: user.username },
            process.env.SECRET_KEY
          );

          res.setHeader("Set-Cookie", [
            serialize("refreshToken", refreshToken, {
              httpOnly: true,
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
            }),
            serialize("accessToken", accessToken, {
              httpOnly: true,
              maxAge: 60,
              sameSite: "strict",
              path: "/",
            }),
          ]);

          res.status(200).send({
            message: "Log in successful",
            user: {
              username: user.username,
            },
          });
        } else {
          res.send("Incorrect username or passowrd");
        }
      } else {
        res.send("Incorrect username or passowrd");
      }
    } else {
      res.send("All fields are neccessary");
    }
  } catch (err) {
    res.status(204).send(err);
  }
});

export default handler;
