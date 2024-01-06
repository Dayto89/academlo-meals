import { Meal } from "./meal.model.js";

export class MealService {
    static async create(data) {
        return Meal.create(data)
    }

    static async findOne(id) {
        return await Meal.findOne({
          where: {
            id: id,
            status: true,
          },
        });
      }
    
      static async findAll() {
        return await Meal.findAll({
          where: {
            status: true,
          },
        });
      }

      static async updateMeal(id, data) {
        return await Meal.update(data, {
          where: {
            id: id,
          }
        });
      }

      static async deleteMeal(id) {
        return await Meal.update({ status: false }, {
          where: {
            id: id
          }
        });
      }
}