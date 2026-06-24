import express from "express";
const router = express.Router();
export default router;

import { getOrders, getOrder } from "#db/queries/orders";

import { getProductsByOrderId } from "#db/queries/orders";

router.post("/", async (req, res) => {
  const date = req.body;
  const order = await getOrders();

  if (!date) {
    return res.status(400).send({ error: "date is required" });
  }
  res.status(201).json(order);
});

router.get("/", async (req, res) => {
  const orders = await getOrders();
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  const order = await getOrder(id);

  if (!order) {
    return res.status(404).send({ error: "Order not found" });
  }

  if (order.userId !== req.user.id) {
    return res.status(403).send({ error: "Forbidden" });
  }

  res.send(order);
});

router.post("/:id/products", async (req, res) => {
  const order = await getProductsByOrderId();

  if (!order) {
    return res.status(404).send({ error: "Order not found" });
  }

  if (order.userId !== req.user.id) {
    return res.status(403).send({ error: "Forbidden" });
  }

  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res
      .status(400)
      .send({ error: "productId and quantity are required" });
  }

  const product = await getProductsByOrderId();

  if (!product) {
    return res.status(400).send({ error: "Product not found" });
  }
  res.send(order);
});

router.get("/:id/products", async (req, res) => {
  const order = await getProductsByOrderId();

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (order.userId !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
});
