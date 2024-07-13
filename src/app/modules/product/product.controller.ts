import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await ProductServices.createProductIntoDB(productData);
  res.json({
    success: true,
    message: "Product has been created successfully",
    data: result,
  });
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Products are fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not found products",
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
};
