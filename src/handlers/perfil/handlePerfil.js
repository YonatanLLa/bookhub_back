require("dotenv").config()
const jwt = require("jsonwebtoken");
const {
	myPerfil,
	myProduct,
	myBuys,
	editProfile,
} = require("../../controllers/perfil/controllerPerfil");
const { JWT_SECRET } = process.env;

const getHandlePerfil = async (req, res) => {
    const token = req.headers.authorization;

    console.log(token);
	
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Verifica y decodifica el token para obtener el userId
    let id;
    try {
      const tokenParts = token.split('Bearer').pop().trim();
      const tokenized = jwt.verify(tokenParts, JWT_SECRET);
       id = tokenized.userId;
      console.log(id);
       const response = await myPerfil(id)
       return res.status(200).json(response) 
    } catch (error) {
        console.log("error", error.message)
        return res.status(400).json({error: error.message})
    }
}

const handleEdithProfile = async (req, res) => {
	const { name, lastName, image } = req.body;
  console.log(name, lastName, image);
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({ message: "Token no proporcionado" });
	}
	// Verifica y decodifica el token para obtener el userId
	let id;
	try {
		const tokenParts = token.split("Bearer").pop().trim();
		const tokenized = jwt.verify(tokenParts, JWT_SECRET);
		id = tokenized.userId;
    const respose = await editProfile(id, name, lastName, image);
		
    return res.status(200).json(respose)
	} catch (error) {
		console.log("error", error.message);
		return res.status(400).json({ error: error.message });
	}
};

const getHandleProduct = async (req, res) => {
    const token = req.headers.authorization;
	
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Verifica y decodifica el token para obtener el userId
    let id;
    try {
      const tokenParts = token.split('Bearer').pop().trim();
      const tokenized = jwt.verify(tokenParts, JWT_SECRET);
      id = tokenized.userId;

       const response = await myProduct(id)
       return res.status(200).json(response) 
    } catch (error) {
        console.log("error", error.message)
        return res.status(400).json({error: error.message})
    }
}

const getHandleMyBuys = async (req, res) => {
   	const token = req.headers.authorization;
	
		if (!token) {
		  return res.status(401).json({ message: 'Token no proporcionado' });
		}
		// Verifica y decodifica el token para obtener el userId
		let id;
		try {
		  const tokenParts = token.split('Bearer').pop().trim();
		  const tokenized = jwt.verify(tokenParts, JWT_SECRET);
		  id = tokenized.userId;
          
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
	getHandleMyBuys,
	handleEdithProfile,
};