const { sequelize } = require("../../core/db");
const { Model, Sequelize } = require("sequelize");

class Doctor extends Model {}

Doctor.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nickname: Sequelize.STRING,
      profile: Sequelize.STRING,
      avatar: Sequelize.STRING,
    },
    {
      sequelize,
      tableName: 'doctor'
    }
  );
  
  module.exports = {Doctor}