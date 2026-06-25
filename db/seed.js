import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createProduct } from "#db/queries/products";
import { createOrder } from "#db/queries/orders";
import { createProductOrder } from "#db/queries/orders_products";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user = await createUser("user1", "password");

  const products = [];
  for (let i = 1; i <= 12; i++) {
    const product = await createProduct({
      title: `Product ${i}`,
      description: `Description for product ${i}`,
      price: (i * 9.99).toFixed(2),
    });
    products.push(product);
  }

  const order = await createOrder(user.id, "2024-01-01");

  for (let i = 0; i < 6; i++) {
    await createProductOrder(order.id, products[i].id, 2);
  }
}
