const path = require("path")
module.exports = {
  "config": path.resolve("./sequelize/config.js"),
  "migration-path": path.resolve("./sequelize/migrations")
}
