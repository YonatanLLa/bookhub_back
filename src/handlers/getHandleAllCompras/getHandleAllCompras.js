require("dotenv").config();
const { allCompras } = require("../../controllers/compras/controllerCompras");
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

const handleAllCompras = async (req, res) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			return res.status(401).json({ message: "Token no proporcionado" });
		}
		let id;
		const tokenParts = token.split("Bearer").pop().trim();
		const tokenized = jwt.verify(tokenParts, JWT_SECRET);
		id = tokenized.userId;

		const today = new Date();
        const startOfWeek = new Date(today);
         startOfWeek.setHours(0, 0, 0, 0);
         startOfWeek.setDate(today.getDate() - today.getDay()); // Establece el inicio de la semana (domingo)

        const endOfWeek = new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000); // Fin de la semana (7 días después)

console.log("star", startOfWeek,"end", endOfWeek);
console.log("id", id);
		const response = await allCompras(id,startOfWeek, endOfWeek)
		return res.status(200).json(response);
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

const getAllComprasReviews = async (req, res) => {
	try {
		const token = req.headers.authorization;

		if (!token || !token.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Token no proporcionado" });
		}

		const tokenParts = token.replace("Bearer ", "").trim();

		let id;
		const tokenized = jwt.verify(tokenParts, JWT_SECRET);
		id = tokenized.userId;

		const getAllcompra = await Venta.findAll({
			where: {
				UserId: id,
				send: true,
			},
			attributes: ["products"], // Only fetch the 'products' field from the database
		});

		const productsList = getAllcompra.map((venta) => venta.products);
		// console.log(productsList);
		res.status(200).json(productsList);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getHandleAllCompras,
	getAllComprasById,
	handleAllCompras,
	getAllComprasReviews,
};
