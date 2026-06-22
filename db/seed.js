import db from "#db/client";

import { createUser } from "#db/queries/user";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 2; i++) {
    const user = await createUser("user" + i, "password");
    await createProduct("product" + i, "description" + i, user.id);
    for (let j = 0; j < 6; j++) {
      await createProductOrder(user.id, (i - 1) * 6 + j + 1);
    }
  }
}
