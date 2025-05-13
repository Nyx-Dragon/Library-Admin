const Member = require("../models/Member");

const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const authMiddleware = async (req, res, next) => {
    // 1. Verifica si hay token en los headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("Missing Authorization token");
    }

    try {
        // 2. Verifica que el token sea válido
        const payload = jwt.verify(token, jwt_secret);
        console.log(payload);
        // 3. Busca al usuario en la base de datos
        const user = await Member.findByPk(payload.id);

        if (!user) {
            return res.status(401).send("User not found");
        }

        // 4. Adjunta el usuario al objeto req para que esté disponible en los controladores
        req.user = user.dataValues;

        console.log(
            "Middleware ejecutado correctamente para el usuario:",
            user.user
        );

        // 5. Continua a la siguiente función middleware o controlador
        next();
    } catch (error) {
        console.error("Error en middleware auth:", error);
        return res.status(401).send("Invalid token");
    }
};

exports.authMiddleware = authMiddleware;
