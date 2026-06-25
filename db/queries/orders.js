import db from "#db/client";

export async function createOrder(userId, date, note = null) {
  const sql = `insert into orders (user_id, date, note) values ($1, $2, $3) returning *`;
  const {
    rows: [order],
  } = await db.query(sql, [userId, date, note]);
  return order;
}

export async function getOrdersByUserId(userId) {
  const sql = `select * from orders where user_id = $1`;
  const { rows: orders } = await db.query(sql, [userId]);
  return orders;
}

export async function getOrder(id) {
  const sql = `select * from orders where id = $1`;
  const {
    rows: [order],
  } = await db.query(sql, [id]);
  return order;
}

export async function getProductsByOrderId(orderId) {
  const sql = `
    select products.*
    from products
    join orders_products on orders_products.product_id = products.id
    where orders_products.order_id = $1
  `;
  const { rows: products } = await db.query(sql, [orderId]);
  return products;
}

export async function getOrdersByProductId(productId, userId) {
  const sql = `
    select orders.*
    from orders
    join orders_products on orders_products.order_id = orders.id
    where orders_products.product_id = $1
    and orders.user_id = $2
  `;
  const { rows: orders } = await db.query(sql, [productId, userId]);
  return orders;
}
