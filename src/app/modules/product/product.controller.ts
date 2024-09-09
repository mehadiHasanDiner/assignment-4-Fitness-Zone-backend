import { ProductServices } from "./product.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { query } from "express";

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const result = await ProductServices.createProductIntoDB(productData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product has been created successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ProductServices.getAllProductsFromDB(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products are fetched successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product retrieved successfully!",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = req.body;
  Object.keys(product).forEach((key) => {
    if (product[key] === null || product[key] === "") {
      delete product[key];
    }
  });
  const result = await ProductServices.updateProductIntoDB(productId, product);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product has been updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteProductFromDB(productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product has been deleted successfully",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
