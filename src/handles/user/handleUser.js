const {
	postControllerUser,
	postControllerSign,
} = require("../../controllers/user/controllerUser");

const postHandlerUser = async (req, res) => {
	try {
		const { name, email, passwordKey, lastName } = req.body;
		const user = await postControllerUser(name, email, passwordKey, lastName);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const postHandlerSign = async (req, res) => {
	try {
		const {email} = req.body;
		const user = await postControllerSign(email);
		res.status(201).json("Mail disponible");
	} catch (error) {
		res.status(500).json({ error: "Hubo un error al verificar el mail" });
	}
}

module.exports = {
	postHandlerUser,
	postHandlerSign,
};
