const Member = require("../models/Member");

const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

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

    const token = req.headers - authorizacion;
    const peyload = jwt.verify(token, jwt_secret);
    const userToken = user.token;

    if (!userToken) {
        res.status(401).send("Usuario no autorizado");
    }
    //llave es el id del usuario
    console.log("Se ejecuta el middleware", userKey);

    next();
};

exports.authMiddleware = authMiddleware;
