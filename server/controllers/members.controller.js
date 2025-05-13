const Member = require("../models/Member");
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

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

    let token = jwt.sign({ userId: user.id }, jwt_secret);

    res.status(201).send({ token: token });
};

const createMember = async (req, res) => {
    const memberName = req.body.name;
    const memberPassword = req.body.password;
    const memberUsername = req.body.user;

    if (!memberPassword || !memberName || !memberUsername) {
        res.status(400).send("Missing required info");
        return;
    }

    const hashedPassword = bcryptjs.hashSync(memberPassword);

    try {
        const existingUser = await Member.findOne({
            where: { user: memberUsername },
        });
        if (existingUser) {
            res.status(400).send("User already exists");
            return;
        }

        const createdMember = await Member.create({
            name: memberName,
            user: memberUsername,
            registrationDate: new Date(),
            password: hashedPassword,
        });
        res.status(201).send({ id: createdMember.id });
    } catch (error) {
        console.log(error);
        res.status(500).send("Unexpected register error");
    }
};

exports.createMember = createMember;
exports.login = login;

//version Nicolas
/* const createMember = async (req, res) => {
  const memberName = req.body.name;
  const memberPassword = req.body.password;
  const memberUsername = req.body.user;

  if(!memberPassword || !memberName || !memberUsername){
    res.status(400).send("Missing required info");
    return
  }

  const hashedPassword = bcryptjs.hashSync(memberPassword);

  try {
    const existingUser = await Member.findOne({
      where: { user: memberUsername },
    });
    if(existingUser){
      res.status(400).send("User already exists");
      return;
    }

    const createdMember = await Member.create({
      name: memberName,
      user: memberUsername,
      registrationDate: new Date(),
      password: hashedPassword,
    });
    res.status(201).send({ id: createdMember.id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected register error");
  }
};
 */
