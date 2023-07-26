const { User } = require("../../db");
const bcrypt = require("bcryptjs");

const postControllerUser = async (name, email, passwordKey, lastName) => {
	if (!name ||!lastName || !email || !passwordKey) {
		throw new Error("All fields are required");
	}
	if (!passwordKey || passwordKey.length < 8) {
		throw new Error("Password is required");
	}

	const hashedPassword = await bcrypt.hash(passwordKey, 12);

	const [user, created] = await User.findOrCreate({
		where: {
			email: email,
		},
		defaults: {
			name: name,
			lastName: lastName,
			passwordKey: hashedPassword,
		},
	});
	if (!created) {
		throw new Error("Email already exists");
	}
	return user;
};

const controllerByEmailUser = async (email) => {
	const user = await User.findOne({
		where: {email}
	});
	return user;
};

module.exports = {
	postControllerUser,
	controllerByEmailUser
};
