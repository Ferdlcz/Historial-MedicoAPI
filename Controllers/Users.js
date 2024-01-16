const UsuarioModel = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

async function registrarUsuario(req, res) {
  try {
    const { Contraseña, Email, Nombre, Apellido, Rol } = req.body;

    //Verificar que los campos no estan vacios
    if (!Contraseña || !Email || !Nombre || !Apellido) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios.",
      });
    }

    //Validar contraseñas
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(Contraseña)) {
      return res.status(400).json({
        success: false,
        message:
          "La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula y un numero",
      });
    }

    //Validar que no se duplique el email
    const isEmailUnique = await UsuarioModel.isEmailUnique(Email);

    if (!isEmailUnique) {
      return res.status(400).json({
        success: false,
        message: "El correo electronico ya esta en uso.",
      });
    }

    //Validar que el email cumpla con el formato
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({
        success: false,
        message: "Debe ser un correo electronico valido.",
      });
    }

    const hashedPassword = await bcrypt.hash(Contraseña, 10);

    const usuarioData = {
      Contraseña: hashedPassword,
      Email,
      Nombre,
      Apellido,
      Rol: Rol || "Paciente",
    };
    await UsuarioModel.registrarUsuario(usuarioData);

    res.json({ success: true, message: "Usuario registrado con exito" });
  } catch (error) {
    console.log("Error al registrar usuario: ", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
}

async function login(req, res) {
  try {

    const { Email, Contraseña } = req.body;
    // Verificar que los campos no estén vacíos
    if (!Email || !Contraseña) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios.",
      });
    }

    // Buscar usuario
    const usuario = await UsuarioModel.getUserEmail(Email);

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "El correo que has ingresado no existe.",
      });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(
      Contraseña,
      usuario.Contraseña
    );

    if (!contraseñaValida) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta.",
      });
    }

    const token = jwt.sign(
      { usuarioId: usuario.IDUsuario },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    const userData = {
      success: true,
      message: "Inicio de sesion exitoso",
      token,
      Usuario: {
        id: usuario.IDUsuario,
        nombre: usuario.Nombre,
        apellido: usuario.Apellido,
        rol: usuario.Rol
      },
    };

    res.json(userData);
  } catch (error) {
    console.log("Error al iniciar sesión: ", error);
    res.status(500).json({ success: false, message: "Error en el servidor." });
  }
}

async function reqResetPassword(req, res) {
  try {
    const { Email } = req.body;
    const usuario = await UsuarioModel.getUserEmail(Email);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado.",
      });
    }

    const token = jwt.sign({ usuarioId: usuario.IDUsuario }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const resetForm = 'http://localhost:8000/newpassword.html'
    //const resetUrl = `https://localhost:3500/api/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: Email,
      subject: "Recuperacion de contraseña",
      html: `
      <h1>Hola ${usuario.Nombre} ${usuario.Apellido}</h1>
      <p>Para restablecer su contraseña haga click en "Restablecer contraseña": </p>
      <a href="${resetForm}">Restablecer contraseña</a>
      <p>Este enlace expirara en 10 minutos.</p>
      <p>¡Gracias!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message:
        "Se ha enviado un enlace de restablecimiento a tu correo electronico.",
      token: token,
    });
  } catch (error) {
    console.log("Error al solicitar restablecimiento de contraseña: ", error);
    res.status(500).json({
      success: false,
      message: "Error  en el servidor.",
    });
  }
}

async function resetPassword(req, res) {
  try {
    const { token } = req.params;  // Obtener el token de la URL
    const { nuevaContraseña } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await UsuarioModel.getUserById(decoded.usuarioId);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado.',
      });
    }

    const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
    await UsuarioModel.updatePassword(usuario.IDUsuario, hashedPassword);

    res.json({
      success: true,
      message: 'Contraseña restablecida con éxito',
    });
  } catch (error) {
    console.log('Error al intentar restablecer la contraseña: ', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'El enlace de restablecimiento ha caducado.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error en el servidor.'
    });
  }
}

module.exports = {
  registrarUsuario,
  login,
  reqResetPassword,
  resetPassword
};
