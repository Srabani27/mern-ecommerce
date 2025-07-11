import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  searchProductController,
  updateProductController,
  realtedProductController,
  productCategoryController
} from "../controllers/productController.js";
import { requireSignIn,isAdmin } from '../middlewares/authMiddlewares.js';

const router = express.Router();

// Create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Get products
router.get("/get-product", getProductController);

// Get single product
router.get("/get-product/:slug", getSingleProductController);

// Get product photo
router.get("/product-photo/:pid", productPhotoController);

// Delete product
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProductController);

// Filter products
router.post("/product-filters", productFiltersController);

// Product count
router.get("/product-count", productCountController);

// Product list by page
router.get("/product-list/:page", productListController);
//search product
router.get("/search/:keyword", searchProductController);
//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;
