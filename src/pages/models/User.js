export default function (sequelize, DataTypes) {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profilePic: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    coverPic: {
      type: DataTypes.STRING,
    },
  });

  return User;
}
