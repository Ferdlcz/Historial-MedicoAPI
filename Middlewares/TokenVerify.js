const jwt = require("jsonwebtoken");

async function tokenVerify(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token no proporcionado.",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token ha expirado.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Token no válido.",
    });
  }
}

module.exports = tokenVerify;
