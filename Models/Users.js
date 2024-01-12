const database = require("../Config/Database");

async function isEmailUnique(Email) {
  const connection = await database.getConnection();
  try {
    const [result] = await connection.query(
      "SELECT COUNT(*) as count FROM Usuarios WHERE Email = ?",
      [Email]
    );
    return result[0].count === 0;
  } finally {
    connection.release();
  }
}

async function registrarUsuario(usuarioData) {
  const connection = await database.getConnection();
  try {
    await connection.query("INSERT INTO Usuarios SET ?", usuarioData);
  } finally {
    connection.release();
  }
}

async function getUserById(userId) {
  const connection = await database.getConnection();
  try {
    const [results] = await connection.query(
      "SELECT * FROM Usuarios WHERE IDUsuario = ?",
      [userId]
    );

    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  } finally {
    connection.release();
  }
}

async function getUserEmail(Email) {
  const connection = await database.getConnection();
  try {
    const [results] = await connection.query(
      "SELECT * FROM Usuarios WHERE Email = ?",
      [Email]
    );

    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  } finally {
    connection.release();
  }
}

async function updatePassword(IDUsuario, nuevaContraseña) {
  const connection = await database.getConnection();
  try {
    await connection.query(
      "UPDATE Usuarios SET Contraseña = ? WHERE IDUsuario = ?",
      [nuevaContraseña, IDUsuario]
    );
  } finally {
    connection.release();
  }
}

module.exports = {
  registrarUsuario,
  isEmailUnique,
  getUserEmail,
  updatePassword,
  getUserById,
};
