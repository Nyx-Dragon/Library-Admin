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
    const { name, user, password } = req.body;

    // Validar datos obligatorios
    if (!name || !user || !password) {
        res.status(400).send("FALTAN_DATOS_EN_EL_BODY");
        return;
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await Member.findOne({ where: { user } });
        if (existingUser) {
            res.status(400).send("USUARIO_YA_EXISTE");
            return;
        }

        // Hashear la contraseña
        const hashedPassword = await bcryptjs.hash(password, 10);
        //Salt añade un numero para garantizar un poco mas de seguridad,
        //(si alguien tiene un diccionario hash(un hacker), y le añades un numero
        //le  dificulta la traduccion);

        // Crear el miembro
        const createdMember = await Member.create({
            name,
            user,
            password: hashedPassword,
            registrationDate: new Date(),
        });

        res.status(201).send({ id: createdMember.id });
    } catch (err) {
        console.error(err);
        res.status(500).send("ERROR_AL_CREAR_MIEMBRO");
    }
};
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
exports.createMember = createMember;
exports.login = login;
