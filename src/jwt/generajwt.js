require("dotenv").config()
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generaJsonWebToken = async (id, email,) => {
        // Crear el token JWT
        const token = jwt.sign(
          { userId: id, email },
          JWT_SECRET, 
          { expiresIn: "1h" } // Opcional: tiempo de expiración del token (1 hora en este caso)
        );
        console.log("token",token)
        // Enviar el token JWT al cliente, por ejemplo, en la respuesta JSON
        return token;
};

module.exports = generaJsonWebToken;