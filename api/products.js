import express from "express";
import { getProducts, getProduct } from "#db/queries/products";
import { getOrdersByProductId } from "#db/queries/orders";
import requireUser from "#middleware/requireUser";

const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await getProduct(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

router.get("/:id/orders", requireUser, async (req, res) => {
  const product = await getProduct(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  const orders = await getOrdersByProductId(req.params.id, req.user.id);
  res.json(orders);
});
