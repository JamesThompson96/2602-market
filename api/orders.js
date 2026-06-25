import express from "express";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import {
  createOrder,
  getOrdersByUserId,
  getOrder,
  getProductsByOrderId,
} from "#db/queries/orders";
import { createProductOrder } from "#db/queries/orders_products";
import { getProduct } from "#db/queries/products";

const router = express.Router();
export default router;

router.post("/", requireUser, requireBody(["date"]), async (req, res) => {
  const { date, note } = req.body;
  const order = await createOrder(req.user.id, date, note);
  res.status(201).json(order);
});

router.get("/", requireUser, async (req, res) => {
  const orders = await getOrdersByUserId(req.user.id);
  res.json(orders);
});

router.get("/:id", requireUser, async (req, res) => {
  const order = await getOrder(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  if (order.user_id !== req.user.id)
    return res.status(403).json({ error: "Forbidden" });
  res.json(order);
});

router.post(
  "/:id/products",
  requireUser,
  requireBody(["productId", "quantity"]),
  async (req, res) => {
    const order = await getOrder(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.user_id !== req.user.id)
      return res.status(403).json({ error: "Forbidden" });
    const { productId, quantity } = req.body;
    const product = await getProduct(productId);
    if (!product) return res.status(400).json({ error: "Product not found" });
    const productOrder = await createProductOrder(
      order.id,
      productId,
      quantity,
    );
    res.status(201).json(productOrder);
  },
);

router.get("/:id/products", requireUser, async (req, res) => {
  const order = await getOrder(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  if (order.user_id !== req.user.id)
    return res.status(403).json({ error: "Forbidden" });
  const products = await getProductsByOrderId(order.id);
  res.json(products);
});
