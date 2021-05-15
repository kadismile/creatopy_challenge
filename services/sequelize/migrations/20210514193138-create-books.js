module.exports.up = (queryInterface, DataTypes) => {
// create a table
  return queryInterface.createTable(
    "books", {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      references: {
        key: "id",
        model: "users"
      },
      type: DataTypes.INTEGER.UNSIGNED,
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
  return queryInterface.dropTable("books")
}