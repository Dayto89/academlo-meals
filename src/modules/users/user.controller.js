import { catchAsync } from "../../common/errors/catchAsync.js"
import { verifyPassword } from "../../config/plugins/emcripted-password.plugin.js"
import generateJWT from "../../config/plugins/generate-jwt.plugin.js"
import { UserService } from "./user.service.js"



export const createUser = catchAsync(async(req, res, next) => {
    const { name, email, password, role } = req.body

    const user = await UserService.create({ name, email, password, role })

    const token = await generateJWT(user.id)

    return res.status(201).json({
        token,
        user: {
            name: user.name,
            email: user.email
        }
    })
})

export const login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    const user = await UserService.findOneByEmail(email);
  
    if (!user) {
      return next(new AppError("user not found", 404));
    }
  
    const isOkPassword = await verifyPassword(password, user.password);
  
    if (!isOkPassword) {
      return next(new AppError("invalid credentials", 401));
    }
  
    const token = await generateJWT(user.id);
  
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
    });
  });



export const updateProfile = catchAsync(async(req, res, next) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    const userUpdated = await UserService.update(user, { name, email });

    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }
})

export const deleteUser = catchAsync(async(req, res, next) => {
  try {
    const { user } = req;

    await UserService.delete(user);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }

})

export const findUserOrders = catchAsync(async(req, res, next) => {

})

export const findOneOrder = catchAsync(async(req, res, next) => {

})    