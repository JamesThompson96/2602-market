import db from "#db/client";

export async function getOrders() {
  const sql = `
  SELECT *
  FROM orders
  `;
  const { rows: orders } = await db.query(sql);
  return orders;
}

export async function getProductsByOrderId(id) {
  const sql = `
  SELECT orders.*
  FROM
    orders
    JOIN products_torders ON products_orders.order_id = orders.id
    JOIN products ON products.id = products_orders.product_id
  WHERE products.id = $1
  `;
  const { rows: orders } = await db.query(sql, [id]);
  return orders;
}

export async function getOrder(id) {
  const sql = `
    select *
    from orders
    where id = $1
    `;
  const {
    rows: [order],
  } = await db.query(sql, [id]);
  return order;
}
