export default function (sequelize, DataTypes) {
  const Like = sequelize.define("like", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: { model: "posts" },
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      references: { model: "users" },
      allowNull: false,
    },
  });

  return Like;
}
