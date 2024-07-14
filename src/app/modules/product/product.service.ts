import builderQuery from "../../builder/builderQuery";
import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  // const result = await ProductModel.find();
  const searchAbleFields = ["name", "category"];
  const result = await builderQuery(
    ProductModel.find(),
    query,
    searchAbleFields
  );
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateProductIntoDB = async (id: string, product: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(
    id,
    { $set: product },
    {
      new: true,
    }
  );
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
