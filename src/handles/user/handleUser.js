const { postControllerUser } = require("../../controllers/user/controllerUser");

const postHandlerUser = async (req, res) => {
	try {
		const { name, email, passwordKey } = req.body;
		const user = await postControllerUser(name, email, passwordKey);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = postHandlerUser;
