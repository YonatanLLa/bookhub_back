const { postControllerUser } = require("../../controllers/user/controllerUser");

const postHandlerUser = async (req, res) => {
	try {
		const { name, email, passwordKey, lastName } = req.body;
		const user = await postControllerUser(name, email, passwordKey, lastName);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = postHandlerUser;
