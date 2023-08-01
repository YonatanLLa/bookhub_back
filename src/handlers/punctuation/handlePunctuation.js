require("dotenv").config()
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { 
    createPuntuation, 
    idByPuntuation, 
    allMyPuntuation, 
    topPuntuation } = require("../../controllers/puntuation/controllerPuntuation");

const handleMyPuntuation = async (req, res) => {
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

        const response = await allMyPuntuation(userId)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}

const handlePuntuation = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await idByPuntuation(id)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}

const handleTopPuntuation = async (req, res) => {
    try {
        const response = await topPuntuation()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}

const handleCreatePuntuation = async (req, res) => {
    const { punctuation, id } = req.body;
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
        
        const response = await createPuntuation(id, punctuation, userId)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    handlePuntuation,
    handleCreatePuntuation,
    handleMyPuntuation,
    handleTopPuntuation
}