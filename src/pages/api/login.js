import nc from "next-connect";
import db from "../models";
import { cookies } from "next/headers";

const handler = nc();
const obj = {
  sals: "kjskdhd",
  john: "kjskdhd",
  slaxu: "kjskdhd",
};
export function getGh() {
  return obj;
}

handler.post(async (req, res) => {
  try {
    db.sequelize.sync();
    const { username, password } = req.body;
    if (username && password) {
      const user = await db.User.findOne({
        where: {
          username,
        },
      });

      if (user) {
      } else {
        res.send("Incorrect username or passowrd");
      }
    } else {
      res.send("All fields are neccessary");
    }
  } catch (err) {
    console.log(err);
  }
});

export default handler;
