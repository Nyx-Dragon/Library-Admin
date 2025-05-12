const Member = require("../models/Member");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //   const hashedPassword = bcryptjs.hashSync(password);
    //   res.send(hashedPassword);
    //   return;

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
    const memberName = req.body.name;
    const createdMember = await Member.create({
        name: memberName,
        registrationDate: new Date(),
    });
    res.status(201).send({ id: createdMember.id });
};

exports.createMember = createMember;
exports.login = login;
