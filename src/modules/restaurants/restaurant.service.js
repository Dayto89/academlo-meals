import { User } from "../users/user.model.js";
import { Restaurant } from "./restaurant.model.js"
import { Review } from "./review.model.js";

export class RestaurantService {
    static async create(data) {
        return Restaurant.create(data)
    }

    static async findOne(id) {
        return await Restaurant.findOne({
          where: {
            id: id,
            status: true,
          },
        });
      }
    
      static async findAll() {
        return await Restaurant.findAll({
          where: {
            status: true,
          },
        });
      }

      static async updateRestaurant(restaurantId, data) {
        return await Restaurant.update(data, {
          where: {
            id: restaurantId,
          }
        });
      }

      static async deleteRestaurant(restaurantId) {
        return await Restaurant.update({ status: false }, {
          where: {
            id: restaurantId
          }
        });
      }

      static async createReview(data) {
        return Review.create(data)
      }

      static async findOneReview(id) {
        return await Review.findOne({
            where: {
                id: id,
                status: true
            },
            include: [
                {
                    model: User
                }
            ] 
        })
      }
      static async update(review, data) {
        return await review.update(data);
      }
    
      static async delete(review) {
        return await review.update({ status: false });
      }
}