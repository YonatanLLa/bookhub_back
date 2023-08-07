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
        return res.status(400).json({error: "No Hay Usuario Con Ese Email"});
    }

    if (!user.isActive) {
        console.log("no esta activo")
        return res.status(401).json({error: "El Usuario Esta Suspendido"});
    }

    // comparo contraseña ingresada con existente
    const passwordValid = await bcrypt.compare(password, (await user).passwordKey);

    if (!passwordValid) {
        //contraseña incorrecta
        return res.status(401).json({ error: "Esta Mal La Contraseña"});
    }

    const token = await  generaJsonWebToken(user.id, user.email, user.admin);
    console.log(user)
    return res.status(200).json({accesoWJT: token, admin: user.admin, vendedor: user.vendedor})

   } catch (error) {
    console.log(error.message)
    return res.status(400).json({error: error.message})
   }
}

module.exports = loginNormal;