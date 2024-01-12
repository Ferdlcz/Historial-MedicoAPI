const mysql = require("mysql2/promise");
require("dotenv").config();

try {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  console.log("Conexion a la base de datos exitosa");
  module.exports = pool;
} catch (error) {
  console.log("Error al conectar a la base de datos: ", error.message);
  process.exit(1);
}
