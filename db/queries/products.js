import db from "#db/client";

export async function createProduct({ name, description, price }) {
  const sql = `
    insert into products
        (name, description, price)
    values
        ($1, $2, $3)
    returning *
    `;
  const {
    rows: [product],
  } = await db.query(sql, [name, description, price]);
  return product;
}

export async function getProducts() {
  const sql = `
    select *
    from products
    `;
  const { rows: products } = await db.query(sql);
  return products;
}

export async function getProduct(id) {
  const sql = `
    select *
    from products
    where id = $1
    `;
  const {
    rows: [product],
  } = await db.query(sql, [id]);
  return product;
}
