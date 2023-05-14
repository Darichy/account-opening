import { compare, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import nc from "next-connect";
import { serialize } from "cookie";
import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma/db/config";
const handler = nc();

// handler.use((req) => {
//   console.log(req.url);
// });
// const verifyJwt = (req, res, next) => {
//   if (req.cookies.accessToken) {
//     verify(req.cookies.accessToken, process.env.SECRET_KEY, (error, data) => {
//       if (error) {
//         console.log("well");
//       } else {
//         res.redirect("back");
//         console.log(data);
//       }
//     });
//   } else if (!req.cookies.accessToken) {
//     next();
//   }
// };

// handler.use(verifyJwt);

handler.post(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const user = await prisma.User.findFirst({
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
              maxAge: 60 * 60,
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
          res.status(207).send("Incorrect username or passowrd");
        }
      } else {
        res.status(207).send("Incorrect username or passowrd");
      }
    } else {
      res.send("All fields are neccessary");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
    res.status(204).end();
  }
});

export default handler;
