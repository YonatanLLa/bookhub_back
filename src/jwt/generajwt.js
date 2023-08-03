require("dotenv").config()
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generaJsonWebToken = (id, email, admin) => {
        // Crear el token JWT
        const token = jwt.sign(
          { userId: id, email, admin },
          JWT_SECRET, 
          { expiresIn: "1d" } // Opcional: tiempo de expiración del token (1 hora en este caso)
        );
        console.log("generate-token",token)
        // Enviar el token JWT al cliente, por ejemplo, en la respuesta JSON
        return token;
};

module.exports = generaJsonWebToken;