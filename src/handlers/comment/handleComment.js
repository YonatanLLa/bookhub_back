require("dotenv").config()
const jwt = require("jsonwebtoken");
const { createReviews, getAllReviews } = require("../../controllers/comment/controllerComment");
const { JWT_SECRET } = process.env;

const getHandleAllReview = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getAllReviews(id) 
        return res.status(200).json(response) 
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}

const postHandleReview = async (req, res) => {
    const { comment, id } = req.body;
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
        
      const response = await createReviews( id, comment, userId)
      return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getHandleAllReview,
    postHandleReview
}