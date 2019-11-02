const { sequelize } = require("../../core/db");

const bcrypt = require("bcryptjs");
const { Model, Sequelize } = require("sequelize");

class User extends Model {
  static async verifyEmailAndPassword(email, password){
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(!user) {
      throw new global.errs.AuthFailed('用户不存在')
    }
    if(!bcrypt.compareSync(password, user.password)) {
      throw new global.errs.AuthFailed('密码错误')
    }
    return user
  }
  static async getUserByOpenId(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  static async createUser(openid) {
    return await User.create({
      openid
    })
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      set(val){
        const salt = bcrypt.genSaltSync(10);
        const pwd = bcrypt.hashSync(val, salt);
        this.setDataValue('password', pwd)
      }
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    },
  },
  {
    sequelize,
    tableName: 'user'
  }
);

module.exports = {User}
