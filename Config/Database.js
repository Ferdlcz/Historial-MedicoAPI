const mysql = require("mysql2/promise");

try {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || '3306',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'historialmedicodb',
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
