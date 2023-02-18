import nc from "next-connect";
import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import User from "../models/User";
import db from "../models";

dotenv.config();
const handler = nc();

handler.get((req, res) => {
  db.sequelize.sync();
  //   return res.send("heyy");
  if (req.cookies.refreshToken) {
    verify(
      req.cookies.refreshToken,
      process.env.SECRET_KEY,
      async (error, results) => {
        if (results) {
          const loggedInUser = await db.User.findOne({
            where: {
              id: results.id,
            },
          });
          const { password, createdAt, updatedAt, ...others } =
            loggedInUser.dataValues;

          console.log(others);
          res.send(others);
        }
      }
    );
  } else {
    res.send("you are not logged in");
  }
});

export default handler;
