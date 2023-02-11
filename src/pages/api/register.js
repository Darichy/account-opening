import nc from "next-connect";
import db from "../models";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

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

    const { username, password, email } = req.body;
    if (username && email && password) {
      const user = await db.User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (!user) {
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await db.User.create({
          username,
          password: hashedPassword,
          email,
        });
        res.send(
          `${newUser.username} Your account has been created successfully`
        );
      } else {
        res.send("Username or email already taken");
      }
    } else {
      res.send("All fields are neccessary");
    }
  } catch (err) {
    console.log(err);
  }
});

export default handler;
