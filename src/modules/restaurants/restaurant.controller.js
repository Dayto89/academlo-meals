import { catchAsync } from "../../common/errors/catchAsync.js"
import { RestaurantService } from "./restaurant.service.js"


export const createRestaurant = catchAsync(async (req, res, next) => {

    const { name, address, rating } = req.body

    const restaurant = await RestaurantService.create({ name, address, rating })

    return res.status(201).json(restaurant)
})

export const findAllRestaurants = catchAsync(async (req, res, next) => {

    try {
        const restaurants = await RestaurantService.findAll();
    
        return res.status(200).json(restaurants);
      } catch (error) {
        return res.status(500).json({
          status: "fail",
          message: "Something went very wrong! 🧨",
        });
      }

})

export const findOneRestaurant = catchAsync(async (req, res, next) => {

  const { id } = req.params

  const restaurant = await RestaurantService.findOne(id)

    return res.status(200).json(restaurant);

})


export const updateRestaurant = catchAsync(async (req, res, next) => {

  try {
    const { name, address } = req.body;
    const  { id } = req.params

    const restaurantUpdated = await RestaurantService.updateRestaurant(id, { name, address });

    return res.status(200).json(restaurantUpdated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }
})


export const deleteRestaurant = catchAsync(async (req, res, next) => {

  try {
    const  { id } = req.params

    await RestaurantService.deleteRestaurant(id)

    return res.status(204).json(null);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }

})


export const createReview = catchAsync(async (req, res, next) => {

  const { id } = req.params;
  const { comment, rating } = req.body;
  const { sessionUser } = req;

  const review = await RestaurantService.createReview({
    userId: sessionUser.id,
    comment: comment,
    restaurantId: id,
    rating: rating
  })

  return res.status(200).json(review)

})

export const updateReview = catchAsync(async (req, res, next) => {

  try {
    const { name, email } = req.body;
    const { user } = req;

    const reviewUpdated = await RestaurantService.update(user, { name, email });

    return res.status(200).json(reviewUpdated);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  } 

})

export const deleteReview = catchAsync(async (req, res, next) => {

  try {
    const { review } = req;

    await RestaurantService.delete(review);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }

})
