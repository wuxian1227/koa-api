const { Sequelize } = require("sequelize");

const { dbName, port, host, user, password } = require("../config/config").db;

const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: true,
  timezone: "+08:00",
  define: {
      paranoid: true,
      underscored: true
  }
});

sequelize.sync({
    // force: true // 会删除表
})

module.exports = {
  sequelize
};
