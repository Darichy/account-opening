import User from "./User";

export default function (sequelize, DataTypes) {
  const Post = sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    caption: {
      type: DataTypes.STRING,
    },
    media: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "users" },
      allowNull: false,
    },
  });

  return Post;
}
