require("dotenv").config();
const {
	createPayment,
	receiveWebhook,
} = require("../../controllers/payment/controllerPayment");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// Verifica y decodifica el token para obtener el userId

const postHandlerPayment = async (req, res) => {
	try {
		const { products, totalPrice, title } = req.body;
		const token = req.headers.authorization;
		if (!token) {
			return res.status(401).json({ message: "Token no proporcionado" });
		}
		let id;
		const tokenParts = token.split("Bearer").pop().trim();
		const tokenized = jwt.verify(tokenParts, JWT_SECRET);
		id = tokenized.userId;

		const response = await createPayment(products, totalPrice, title, id);
		res.status(200).json(response);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};

const postHandlerWebhook = async (req, res) => {
	try {
		const response = await receiveWebhook(req);
		res.status(200).json(response);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	postHandlerPayment,
	postHandlerWebhook,
};
