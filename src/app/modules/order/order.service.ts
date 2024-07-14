import { ProductModel } from "../product/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await OrderModel.create(payload);

  for (const cartItem of result.cartItems) {
    await ProductModel.findByIdAndUpdate(cartItem._id, {
      stock: cartItem.stock - cartItem.quantity!,
    });
  }
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
};
