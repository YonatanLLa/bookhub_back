const { controllerByEmailUser } = require("../../controllers/user/controllerUser");
const bcrypt = require("bcrypt");
const generaJsonWebToken = require("../../jwt/generajwt");


const loginNormal = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
   try {
    const user = await controllerByEmailUser(email);

    if (!user) {
        console.log("no ahi usuario")
        return res.status(400).json({error: "no ahi usuario con ese email"});
    }

    if (!user.isActive) {
        console.log("no esta activo")
        return res.status(401).json({error: "el usuario no esta activo"});
    }

    // comparo contraseña ingresada con existente
    const passwordValid = await bcrypt.compare(password, (await user).passwordKey);

    if (!passwordValid) {
        //contraseña incorrecta
        return res.status(401).json({ error: "esta mal la contraseña"});
    }

    const token = await  generaJsonWebToken(user.id, user.email, user.admin);
    // console.log(token)
    return res.status(200).json({accesoWJT: token, admin: user.admin})

   } catch (error) {
    console.log(error.message)
    return res.status(400).json({error: error.message})
   }
}

module.exports = loginNormal;