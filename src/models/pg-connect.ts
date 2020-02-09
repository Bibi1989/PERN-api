import connect, { sql } from "@databases/pg";

const db = connect();
function authenticate() {
  console.log("connected");
  return db.query(sql`SELECT 1 + 1 AS result`);
}

export { db, sql, authenticate };
