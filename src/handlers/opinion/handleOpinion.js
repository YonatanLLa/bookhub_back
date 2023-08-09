require("dotenv").config()
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { opinions, opinionById } = require("../../controllers/opinion/controllerOpinion")

const handleOpinions = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      console.log("no ahi token")
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    // Verifica y decodifica el token para obtener el userId
    let userId;
    try {
      const tokenParts = token.split('Bearer').pop().trim();
      const tokenized = jwt.verify(tokenParts, JWT_SECRET);
      userId = tokenized.userId;
      console.log("token", userId);

        const response = await opinions(userId)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error})
    }
}

const handleIdOpinion = async (req, res) => {
    const { id } = req.params;

    const token = req.headers.authorization;
    if (!token) {
      console.log("no ahi token")
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    // Verifica y decodifica el token para obtener el userId
    let userId;
    try {
      const tokenParts = token.split('Bearer').pop().trim();
      const tokenized = jwt.verify(tokenParts, JWT_SECRET);
      userId = tokenized.userId;
      console.log("token", userId);

        const response = await opinionById(id, userId)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error})
    }
}

module.exports = {
    handleOpinions,
    handleIdOpinion
};