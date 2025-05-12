const Member = require("../models/Member");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
    console.log("BODY RECIBIDO:", req.body);

    const username = req.body.username;
    const password = req.body.password;
    //const hashedPassword = bcryptjs.hashSync(password);
    //res.send(hashedPassword);
    //return;

    if (!username || !password) {
        res.status(400).send("FALTAN_DATOS_EN_EL_BODY");
        return;
    }

    const user = await Member.findOne({ where: { user: username } });
    if (!user) {
        res.status(400).send("INCORRECT_USER_OR_PASSWORD");
        return;
    }

    const isPasswordMatch = bcryptjs.compareSync(password, user.password);
    if (!isPasswordMatch) {
        res.status(400).send("INCORRECT_USER_OR_PASSWORD");
        return;
    }

    res.status(201).send({ llave: user.id });
};

const createMember = async (req, res) => {
    try {
        const { name, username, password } = req.body;

        if (!name || !username || !password) {
            return res
                .status(400)
                .json({ message: "Faltan campos obligatorios" });
        }

        const existingUser = await Member.findOne({
            where: { user: username },
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "El nombre de usuario ya existe" });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const createdMember = await Member.create({
            name: name,
            user: username,
            password: hashedPassword,
            registrationDate: new Date(),
        });

        res.status(201).json({ id: createdMember.id });
    } catch (error) {
        console.error("Error al crear miembro:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

exports.createMember = createMember;
exports.login = login;
