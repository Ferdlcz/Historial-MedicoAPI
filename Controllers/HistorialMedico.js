const database = require("../Config/Database");
const usuarioModel = require("../Models/Users")

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

    console.log(IDUsuario);

    if (!IDUsuario) {
      return res.status(401).json({ success: false, message: "Usuario no autenticado" });
    }

    connection = await database.getConnection();

    await connection.beginTransaction();

    try {


const [historialExistente] = await connection.query("CALL ConsultarHistorialID(?)", [IDUsuario]);

if (historialExistente && historialExistente.length > 0 && historialExistente[0].length > 0) {
  await connection.rollback();
  connection.release();
  return res.status(400).json({ success: false, message: 'Ya existe un historial médico para este usuario.' });
}


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

      await connection.commit();

      connection.release();

      res.json({ success: true, message: "Registro exitoso" });
      console.log("Registrado correctamente");
    } catch (error) {

      await connection.rollback();
      console.error("Error al ejecutar el procedimiento almacenado:", error);

      connection.release();

      res.status(500).json({ success: false, message: "Error en el servidor" });
    }
  } catch (error) {
    console.error("Error al ejecutar el procedimiento almacenado:", error);

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
    res.status(500).json({ success: false,});
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

async function ObtenerHistorialByID(req, res){
  try{
    const {IDUsuario} = req.params;

    if(!IDUsuario){
      return res.status(404).json({
        success: false,
        message: "No se ha encontrado el usuario"
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

async function ActualizarHistorial(req, res) {
  let connection;

  try {

    const IDUsuario = req.params.IDUsuario;

    if(!IDUsuario){
      return res.status(401).json({
        success: false,
        message: "Usuario no proporcionado"
      })
    }

    const user = await usuarioModel.getUserById(IDUsuario);
    if(!user){
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      })
    }

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

    connection = await database.getConnection();
    await connection.beginTransaction();

    try {
      await connection.query(
        "CALL ActualizarHistorial(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

      await connection.commit();
      connection.release();

      res.json({
        success: true,
        message: "Actualización exitosa del historial médico",
        data: user
      });
    } catch (error) {
      await connection.rollback();
      console.error("Error al ejecutar el procedimiento almacenado:", error);
      res.status(500).json({
        success: false,
        message: "Error en el servidor"
      });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
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

async function addObservation(req, res){
  let connection;

  try{
    const { IDUsuario, Observacion } = req.body;

    connection = await database.getConnection();
    await connection.beginTransaction();

    try{
      await connection.query("INSERT INTO Observaciones (IDUsuario, Observacion) VALUES (?, ?)", [
        IDUsuario,
        Observacion
      ])

      await connection.commit();
      connection.release();

      res.json({
        success: true,
        message: "Registro exitoso",
        data: { IDUsuario, Observacion }
      });
    }finally{
      connection.release();
    }

  }catch(error){
    console.error("Error al procesar la solicitud:", error);
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

module.exports = {
  CrearHistorial,
  ObtenerHistorial,
  ObtenerHistorialID,
  ObtenerHistorialByID,
  ActualizarHistorial,
  addObservation,
};