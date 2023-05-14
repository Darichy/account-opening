import nc from "next-connect";
import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import User from "../models/User";
import { prisma } from "prisma/db/config";
import { promisify } from "util";

dotenv.config();

const handler = nc();

handler.get((req, res) => {
  //   return res.send("heyy");
  if (req.cookies.refreshToken) {
    verify(
      req.cookies.refreshToken,
      process.env.SECRET_KEY,
      async (error, results) => {
        if (results) {
          const loggedInUser = await prisma.user.findFirst({
            where: {
              id: results.id,
            },
          });
          const { password, createdAt, updatedAt, ...others } = loggedInUser;

          res.send(others);
        }
      }
    );
  } else {
    res.send("you are not logged in");
  }
});

export default handler;
