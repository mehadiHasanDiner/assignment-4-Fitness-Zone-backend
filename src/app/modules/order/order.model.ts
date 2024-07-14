import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";
import { productSchema } from "../product/product.model";

const orderSchema = new Schema<TOrder>({
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
  },
  cartItems: [productSchema],
});

export const OrderModel = mongoose.model<TOrder>("Order", orderSchema);
