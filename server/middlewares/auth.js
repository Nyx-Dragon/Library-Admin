const Member = require("../models/Member");
const authMiddleware = async (req, res, next) => {
    //revisa llave
    const userKey = req.headers["llave"];
    if (!userKey) {
        res.status(401).send("Missing auth header");
        return;
    }
    req.user = user.dataValues;
    //llave es el id del usuario
    console.log("Se ejecuta el middleware", user);

    const user = await Member.findByPk(userKey);
    if (!userKey) {
        res.status(401).send("Missing auth header");
        return;
    }
    //llave es el id del usuario
    console.log("Se ejecuta el middleware", userKey);

    next();
};

exports.authMiddleware = authMiddleware;
