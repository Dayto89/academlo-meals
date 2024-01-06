import { catchAsync } from "../../common/errors/catchAsync.js"
import { MealService } from "./meal.service.js"

export const createMeal = catchAsync(async(req, res, next) => {
    const { id } = req.params
    const restaurantId = id
    const { name, price } = req.body
    

    const meal = await MealService.create({ name, price, restaurantId })

    return res.status(201).json(meal)
})

export const findAllMeals = catchAsync(async(req, res, next) => {
     
    try {
        const meals = await MealService.findAll();
    
        return res.status(200).json(meals);
      } catch (error) {
        return res.status(500).json({
          status: "fail",
          message: "Something went very wrong! 🧨",
        });
      }

})

export const findOneMeal = catchAsync(async(req, res, next) => {

  const { id } = req.params

  const meal = await MealService.findOne(id)

  return res.status(200).json(meal);
     
})

export const updateMeal = catchAsync(async(req, res, next) => {

  try {
    const { name, price } = req.body;
    const  { id } = req.params

    const restaurantMeal = await MealService.updateMeal(id, { name, price });

    return res.status(200).json(restaurantMeal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }
     
})

export const deleteMeal = catchAsync(async(req, res, next) => {

  try {
    const  { id } = req.params

    await MealService.deleteMeal(id)

    return res.status(204).json(null);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }
})