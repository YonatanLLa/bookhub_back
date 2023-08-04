const {
	postControllerUser,
	postControllerSign,
} = require("../../controllers/user/controllerUser");
const{ User } = require("../../db")

const getHandlerUser = async (req, res) => {
	const { email } = req.query;
	try {
		const user =await User.findAll({
			order: [["name", "ASC"]],
		})
		if (email) {
			const response = user.filter((e)=> e.email.toLowerCase().includes(email.toLowerCase()))
			return res.status(200).json(response);
		}
		return res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const postHandlerUser = async (req, res) => {
	try {
		const { name, email, passwordKey, lastName } = req.body;

		console.log(name, email, passwordKey, lastName);

		const user = await postControllerUser(name, email, passwordKey, lastName);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const postHandlerSign = async (req, res) => {
	try {
		const {email} = req.body;
		console.log(email);
		const user = await postControllerSign(email);
		res.status(201).json("Mail disponible");
	} catch (error) {
		res.status(500).json({ error: "Hubo un error al verificar el mail" });
	}
}


module.exports = {
	postHandlerUser,
	postHandlerSign,
	getHandlerUser
};
