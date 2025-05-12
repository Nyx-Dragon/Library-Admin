const authMiddleware = async (req, res, next) => {
  const userKey = req.headers["llave"];

  if (!userKey) {
    return res.status(401).send("Missing auth header");
  }

  try {
    // Aquí deberías buscar el usuario en la base de datos por su ID o token
    const user = await Member.findByPk(userKey);

    if (!user) {
      return res.status(403).send("Invalid user key");
    }

    // Guardamos el usuario en la request para el siguiente middleware/controlador
    req.user = user;
    console.log("Usuario autenticado:", user.name);
    next();
    
  } catch (error) {
    console.error("Error en authMiddleware:", error);
    res.status(500).send("Server error");
  }
};

exports.authMiddleware = authMiddleware;
