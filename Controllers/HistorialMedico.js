const database = require('../Config/Database');

async function CrearHistorial(req, res){
    try{
        const{
             nombre,
             apellidoPaterno,
             apellidoMaterno,
             fechaNacimiento,
             edad,
             telefono,
             email,
             direccion,
             numero,
             colonia,
             municipio,
             estado,
             antecedenteEnfermedades,
             antecedenteHereditarios,
             consumoAlcohol,
             consumoTabaco,
             alergias,
             historialMenstrual,
             menarca,
             ivsa,
             anticopceptivo,
             examenes,
             fur,
             numeroEmbarazos,
             numeroPartos,
             numeroCesareas,
             numeroLegrado,
             complicacionesParto,
             complicacionesEmbarazo,
             diabetesGestacional,
             pesobebe,
             antecedentesFamEmbarazo,
             peso,
             talla,
             ta,
             spo2,
             temperatura
        }= req.body;

        const connection = await database.getConnection();

        await connection.beginTransaction();

        try{
            await connection.query('CALL CrearHistorial(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                fechaNacimiento,
                edad,
                telefono,
                email,
                direccion,
                numero,
                estado,
                municipio,
                colonia,
                antecedenteEnfermedades,
                antecedenteHereditarios,
                consumoAlcohol,
                consumoTabaco,
                alergias,
                historialMenstrual,
                menarca,
                ivsa,
                anticopceptivo,
                examenes,
                fur,
                numeroEmbarazos,
                numeroPartos,
                numeroCesareas,
                numeroLegrado,
                complicacionesParto,
                complicacionesEmbarazo,
                diabetesGestacional ,
                pesobebe,
                antecedentesFamEmbarazo,
                peso,
                talla,
                ta,
                spo2,
                temperatura
            ]);
            await connection.commit();

            connection.release();

            res.json({ success: true, message: 'Registro exitoso' });
            console.log("Registrado correctamente")
        }catch (error) {
            await connection.rollback();
            console.error('Error al ejecutar el procedimiento almacenado:', error);

            connection.release();

            res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
} catch (error) {
    await connection.rollback();
    console.error('Error al ejecutar el procedimiento almacenado:', error);

    connection.release();

    res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
}
}

async function ObtenerHistorial(req, res) {
    try {
        const connection = await database.getConnection();

        await connection.beginTransaction();

        try {
            const [results] = await connection.query('CALL ConsultarHistorial()');
            const informacionUsuarios = results[0];
            res.json({ informacionUsuarios });

            await connection.commit();
        } catch (error) {
            await connection.rollback();
            console.error('Error al ejecutar el procedimiento almacenado:', error);
            res.status(500).json({ success: false, message: 'Error en el servidor' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
}
  
  module.exports = {
    CrearHistorial,
    ObtenerHistorial,
  };