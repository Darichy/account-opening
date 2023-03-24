import { Sequelize } from "sequelize";
import User from "./User";
import dotenv from "dotenv";
import Post from "./Post";
import Like from "./Like";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    logging: () => {
      return true;
    },
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = sequelize;
db.User = User(sequelize, Sequelize.DataTypes);
db.Like = Like(sequelize, Sequelize.DataTypes);
db.Post = Post(sequelize, Sequelize.DataTypes);
db.Post.belongsTo(db.User);
db.Like.belongsTo(db.Post);
db.Like.belongsTo(db.User);
db.User.hasMany(db.Post);
db.Post.hasMany(db.Like);

export default db;
