import mysql from "mysql2";

export const db = mysql.createPool({
  host: "mainline.proxy.rlwy.net",
  port: 28212,
  user: "root",
  password: "ncmnVtQIjwvMZVaKitUrBlxcNUtsgykf",
  database: "ipb_alvorada",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

