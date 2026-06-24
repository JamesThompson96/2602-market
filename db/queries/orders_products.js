import db from "#db/client";

export async function createProductOrder(productId, orderId) {
  const sql = `
  INSERT INTO orders_products
    (product_id, order_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [productOrder],
  } = await db.query(sql, [productId, orderId]);
  return productOrder;
}
