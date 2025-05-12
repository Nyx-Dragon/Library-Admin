const Member = require("../models/Member");

const authMiddleware = async (req, res, next) => {
    // Existe llave del usuario
    const userKey = req.headers["llave"];
    if (!userKey) {
        res.status(401).send("Missing auth header");
        return;
    }
    // Llave es el id del usuario
    const user = await Member.findByPk(userKey);
    if (!user) {
        res.status(401).send("Invalid auth header");
        return;
    }
    // Agregar el usuario a la request que se esta haciendo
    req.user = user.dataValues;
    next();
};

exports.authMiddleware = authMiddleware;
