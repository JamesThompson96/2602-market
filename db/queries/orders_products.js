import db from "#db/client";

export async function createProductOrder(orderId, productId, quantity = 1) {
  const sql = `
    INSERT INTO orders_products (order_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const {
    rows: [productOrder],
  } = await db.query(sql, [orderId, productId, quantity]);
  return productOrder;
}
