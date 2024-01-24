const database = require("../Config/Database");

function obtenerIDUsuarioSesion(req) {
  const usuarioSesion = req.usuario;

  if (usuarioSesion && usuarioSesion.usuarioId) {
    return usuarioSesion.usuarioId;
  } else {
    return null;
  }
}


// Función para crear el historial en la base de datos
async function CrearHistorial(req, res) {
  let connection;

  try {
    // Extraer datos del cuerpo de la solicitud y del usuario autenticado
    const {
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
      temperatura,
    } = req.body;

    const IDUsuario = obtenerIDUsuarioSesion(req);

    console.log(IDUsuario)

    if (!IDUsuario) {
      return res.status(401).json({ success: false, message: "Usuario no autenticado" });
    }

    // Obtener una conexión a la base de datos
    connection = await database.getConnection();

    // Iniciar una transacción en la base de datos
    await connection.beginTransaction();

    try {
      await connection.query(
        "CALL CrearHistorial(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          IDUsuario,
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
          diabetesGestacional,
          pesobebe,
          antecedentesFamEmbarazo,
          peso,
          talla,
          ta,
          spo2,
          temperatura,
        ]
      );

      // Confirmar la transacción si todo fue exitoso
      await connection.commit();

      // Liberar la conexión a la base de datos
      connection.release();

      // Enviar una respuesta JSON indicando éxito
      res.json({ success: true, message: "Registro exitoso" });
      console.log("Registrado correctamente");
    } catch (error) {
      await connection.rollback();
      console.error("Error al ejecutar el procedimiento almacenado:", error);

      // Liberar la conexión a la base de datos
      connection.release();

      res.status(500).json({ success: false, message: "Error en el servidor" });
    }
  } catch (error) {
    console.error("Error al ejecutar el procedimiento almacenado:", error);

    // Liberar la conexión a la base de datos si ocurrió un error antes de la transacción
    if (connection) {
      connection.release();
    }

    res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error.message,
    });
  }
}

async function ObtenerHistorial(req, res) {
  try {
    const connection = await database.getConnection();

    await connection.beginTransaction();

    try {
      const [results] = await connection.query("CALL ConsultarHistorial()");
      const informacionUsuarios = results[0];
      res.json({ informacionUsuarios });

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error("Error al ejecutar el procedimiento almacenado:", error);
      res.status(500).json({ success: false, message: "Error en el servidor" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
}

async function ObtenerHistorialID(req, res){
  try{
    const IDUsuario = obtenerIDUsuarioSesion(req);

    if(!IDUsuario){
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado"
      })
    }

    const connection = await database.getConnection();
    await connection.beginTransaction();

    try{
      const [results] = await connection.query("CALL ConsultarHistorialID(?)", [IDUsuario]);
      const infoUsuarios = results[0];

      if(!infoUsuarios || infoUsuarios.length === 0){
        return res.status(404).json({
          success: false,
          message: "No se ha encontrado un historial medico para este usuario"
        })
      }

      res.json({infoUsuarios});

      await connection.commit();
    }catch(error){
      await connection.rollback();
      console.log("Error al ejecutar el procedimiento almacenado: ", error);
      res.status(500).json({
        success: false,
        message: "Error en el servidor"
      })
    }finally{
      connection.release();
    }
  }catch(error){
    console.log("Error al procesar la solicitud: ", error);
    res.status(500).json({
      success: false, 
      message: "Error en el servidor"
    })
  }
}

module.exports = {
  CrearHistorial,
  ObtenerHistorial,
  ObtenerHistorialID
};
