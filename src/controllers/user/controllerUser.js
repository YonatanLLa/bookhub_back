const { User } = require("../../db");
const bcrypt = require("bcryptjs");
const { avisoLogin } = require("../../email/email");

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
	await avisoLogin(email)
	return user;
};
const postControllerSign = async (email) => {
	const validationEmail = await User.findOne({
		where: {
			email: email,
		}
	})
	if (validationEmail) {
		return res.status(400).json({
			error: "El correo electronico ya existe",
		})
	}
	return validationEmail;
}

	

const controllerByEmailUser = async (email) => {
	const user = await User.findOne({
		where: {email}
	});
	return user;
};

module.exports = {
	postControllerUser,
	controllerByEmailUser,
	postControllerSign
};
