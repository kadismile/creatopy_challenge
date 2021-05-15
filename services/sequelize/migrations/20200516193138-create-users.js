module.exports.up = (queryInterface, DataTypes) => {
// create a table
  return queryInterface.createTable(
    "users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    resetPasswordToken: {
      allowNull: true,
      type: DataTypes.STRING
    },
    resetPasswordExpire: {
      allowNull: true,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
      charset: "utf8"
    })
}

module.exports.down = (queryInterface) => {
  // drop the table
  return queryInterface.dropTable("users")
}