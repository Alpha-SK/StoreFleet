import { createNewOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  try {
    const order = await createNewOrderRepo(req.body); // Assuming request body contains necessary order data
    console.log("in controller");
    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(new ErrorHandler(500, "Failed to place order"));
  }
};
