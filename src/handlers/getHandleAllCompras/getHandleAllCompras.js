require("dotenv").config();
const { Venta } = require("../../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const getHandleAllCompras = async (req, res) => {
	try {
		const token = req.headers.authorization;
		if (!token) {
			return res.status(401).json({ message: "Token no proporcionado" });
		}
		let id;
		const tokenParts = token.split("Bearer").pop().trim();
		const tokenized = jwt.verify(tokenParts, JWT_SECRET);
		id = tokenized.userId;
		const getAllcompra = await Venta.findAll({
			where: {
				UserId: id,
				send: true,
			},
		});
		res.status(200).json(getAllcompra);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};

const getAllComprasById = async (req, res) => {
	try {
		const { id } = req.params;
		const getAllcompra = await Venta.findAll({
			where: {
				id: id,
				send: true,
			},
		});
		if (getAllcompra.length > 0) {
			// console.log("send", getAllcompra);
			return res.status(200).json({
				send: true,
			});
		}
		return res.status(200).json({
			send: false,
		});
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getHandleAllCompras,
	getAllComprasById,
};
