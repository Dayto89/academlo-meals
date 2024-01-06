import { Order } from "./order.model.js";

export class OrderService {
    static async create(data) {
        return Order.create(data)
    }

    static async findOne(id) {
        return await Order.findOne({
          where: {
            id: id,
            status: true,
          },
        });
      }
    
      static async findAll() {
        return await Order.findAll({
          where: {
            status: true,
          },
        });
      }

      static async updateOrder(order) {
        return await order.update({ status: "completed" });
      }

      static async deleteOrder(order) {
        return await order.update({ status: "cancelled" });
      }
}