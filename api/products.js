import express from "express";
const router = express.Router();
export default router;

import { createProduct, getProducts, getProduct } from "#db/queries/products";

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

router.get("/:id", (req, res) => {
  if (!req.body) return res.status(404).send("Sorry, product does not exist!");
});

router.get("/:id/orders", async (req, res) => {
  const orders = await getOrdersByProductId(req.product.id);
  res.send(orders);
});
