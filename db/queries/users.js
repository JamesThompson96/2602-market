import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
  const hashed = await bcrypt.hash(password, 10);
  const sql = `insert into users (username, password) values ($1, $2) returning *`;
  const {
    rows: [user],
  } = await db.query(sql, [username, hashed]);
  return user;
}

export async function getUserById(id) {
  const sql = `select * from users where id = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const sql = `select * from users where username = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  return match ? user : null;
}
