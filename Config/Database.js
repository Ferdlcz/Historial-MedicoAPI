const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

connection.connect((err) =>{
    if(err){
        console.log("Error al conectar a la base de datos: ", err)
        return;
    }else{
        console.log('Conexion a la base de datos establecida');
    }
});
