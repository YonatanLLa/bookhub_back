require("dotenv").config()
const jwt = require("jsonwebtoken");
const { createReviews, getAllReviews, getAllMyComment } = require("../../controllers/comment/controllerComment");
const { JWT_SECRET } = process.env;

// le trae todo los comentario de los libros
const handleMyComment = async (req, res) => {
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
        
        const response = await getAllMyComment(userId) 
        return res.status(200).json(response) 
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}

// le trae todo los comentario de los libros
const getHandleAllComment= async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getAllReviews(id) 
        return res.status(200).json(response) 
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}

//crea los comentario del libro
const postHandleComment = async (req, res) => {
    const { comment, id } = req.body;
    console.log(comment, id);
    const token = req.headers.authorization;
	
    if (!token) {
      console.log(token)
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    // Verifica y decodifica el token para obtener el userId
    let userId;
    try {
      const tokenParts = token.split('Bearer').pop().trim();
      const tokenized = jwt.verify(tokenParts, JWT_SECRET);
      userId = tokenized.userId;
        
      const response = await createReviews( id, comment, userId)
      console.log(response);
      return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getHandleAllComment,
    postHandleComment,
    handleMyComment
}