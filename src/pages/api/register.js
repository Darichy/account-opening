import nc from "next-connect";
import bcrypt from "bcryptjs";
import { prisma } from "prisma/db/config";

const handler = nc();
// const obj = {
//   sals: "kjskdhd",
//   john: "kjskdhd",
//   slaxu: "kjskdhd",
// };
// export function getGh() {
//   return obj;
// }

handler.post(async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    // return console.log(response);
    const { username, password, email } = req.body;
    if (username && email && password) {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (!user) {
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
          data: {
            username,
            password: hashedPassword,
            email,
          },
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
