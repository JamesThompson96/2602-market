import db from "#db/client";

export async function createUser(name) {
  const sql = `
    insert into products
        (name)
    values
        ($1, $2)
    returning *
    `;
  const {
    rows: [user],
  } = await db.query(sql, [name]);
  return user;
}

export async function getUsers() {
  const sql = `
    select *
    from users
    `;
  const { rows: users } = await db.query(sql);
  return users;
}
