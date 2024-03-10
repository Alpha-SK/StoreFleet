import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  try {
    console.log("in repos");
    return await new OrderModel(data).save();
  } catch (error) {
    throw new Error("Could not create new order");
  }
};
