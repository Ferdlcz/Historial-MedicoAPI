const database = require("../Config/Database");

async function searchUser(req, res) {
    try {
        const { term } = req.query;
        
        const connection = await database.getConnection();
        
        const [results] = await connection.query(
            "SELECT Nombre, ApellidoPaterno FROM informacionpersonal WHERE Nombre LIKE ? OR ApellidoPaterno LIKE ? OR CONCAT(Nombre, ' ', ApellidoPaterno) LIKE ?",
            [`%${term}%`, `%${term}%`, `%${term}%`]
        );
    
        connection.release();

        res.json({ 
            success: true, 
            results
        });    
    } catch(error) {
        console.log("Error al buscar paciente:", error);
        res.status(500).json({
            success: false,
            message: "Error en el servidor"
        });
    }
}

module.exports = { searchUser };