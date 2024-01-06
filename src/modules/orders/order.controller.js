import { catchAsync } from "../../common/errors/catchAsync.js"
import { OrderService } from "./order.service.js"





export const createOrder = catchAsync(async (req, res, next) => {

    const { quantity, mealId } = req.body
    
    const order = await OrderService.create({ quantity, mealId })

    return res.status(201).json(order)

})


export const findAllOrdersUser = catchAsync(async (req, res, next) => {

})


export const updateStatusCompleted = catchAsync(async (req, res, next) => {

    try {
        const  { order } = req
    
        const orders = await OrderService.updateOrder(order);
    
        return res.status(200).json(orders);
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: "fail",
          message: "Something went very wrong! 🧨",
        });
      }
         

})


export const updateStatusCancelled = catchAsync(async (req, res, next) => {

    try {
        const  { order } = req
    
        const orders = await OrderService.deleteOrder(order);
    
        return res.status(200).json(orders);
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: "fail",
          message: "Something went very wrong! 🧨",
        });
      }
         


})