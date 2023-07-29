require("dotenv").config()
const jwt = require("jsonwebtoken");
const { myPerfil, myProduct, myBuys } = require("../../controllers/perfil/controllerPerfil");
const { JWT_SECRET } = process.env;

const getHandlePerfil = async (req, res) => {
    let token = req.headers.authorization;
    try {
       token = token.split("Bearer").pop().trim();
       const tokenized = jwt.verify(token, JWT_SECRET)
       const id = tokenized.userId;
       
       const response = await myPerfil(id)
       return res.status(200).json(response) 
    } catch (error) {
        console.log("error", error.message)
        return res.status(400).json({error: error.message})
    }
}

const getHandleProduct = async (req, res) => {
    let token = req.headers.authorization;
    try {
       token = token.split("Bearer").pop().trim();
       const tokenized = jwt.verify(token, JWT_SECRET)
       const id = tokenized.userId;
       
       const response = await myProduct(id)
       return res.status(200).json(response) 
    } catch (error) {
        console.log("error", error.message)
        return res.status(400).json({error: error.message})
    }
}

const getHandleMyBuys = async (req, res) => {
    let token = req.headers.authorization;
    try {
       token = token.split("Bearer").pop().trim();
       const tokenized = jwt.verify(token, JWT_SECRET)
       const id = tokenized.userId;
       
       const response = await myBuys(id)
       return res.status(200).json(response) 
    } catch (error) {
        console.log("error", error.message)
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getHandlePerfil,
    getHandleProduct,
    getHandleMyBuys
}