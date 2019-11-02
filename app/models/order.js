const { sequelize } = require("../../core/db");
const { Model, Sequelize } = require("sequelize");

class Order extends Model {
  static async getCurrentOrderStatus(uid) {
    const order = await Order.findOne({
      where: {
        uid: uid
      }
    })
    const preOrders = await Order.findAll({
      'order': [
        ['updated_at', 'DESC']
      ]
    })
    return {
      status: order.status,
      preOrders: preOrders.length - 1
    }
  }

  static async preOrder(uid, cure_id,  status) {
    let order = await Order.findOne({
      where: {
        uid: uid
      }
    })
    if(!order && status === 1) {
      if(cure_id === undefined) {
        throw new new global.errs.ParameterException('治疗项目不能为空')
      }
       order = await Order.create({
        uid,
        cure_id,
        status
      })
    }
    if(order && order.status !== 3) {
      await order.update({
        status
      })
    }

    const preOrders = await Order.findAll({
      'order': [
        ['updated_at', 'DESC']
      ]
    })

    return {
      preOrders: preOrders.length -1,
      status: order.status
    }
  }

  static async cancelOrder(order_id, type, uid) {}
}

Order.init({
  uid: Sequelize.INTEGER,
  order_id: Sequelize.INTEGER,
  doctor_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
  cure_id: Sequelize.INTEGER, // 0 腰椎, 1 颈椎
  status: Sequelize.INTEGER, // 0 init, 1 ordered, 2 cancel, 3 finished
},{
  sequelize,
  tableName: 'order'
});

module.exports = { Order };
