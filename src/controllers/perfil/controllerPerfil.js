const { User, Book, Venta, Author, Gender } = require("../../db");

const myPerfil = async (id) => {
	const user = await User.findByPk(id, {
		attributes: ["name", "lastName", "image", "email"],
	});
	return user;
};

const editProfile = async (id, name, lastName, image) => {
	const user = await User.findByPk(id);
	user.name = name;
	user.lastName = lastName;
	user.image = image;
	user.save();
	return user;
};

const myProduct = async (id) => {
	const user = await Book.findAll({
		where: { venta_user_id: id },
		include: [
			{ model: Author, attributes: ["id", "name"] },
			{ model: Gender, attributes: ["id", "name"] },
		],
	});
	return user;
};

const myBuys = async (id) => {
	const user = await Venta.findAll({
		where: { UserId: id },
	});

	console.log(user, "buys");

	return user;
};

module.exports = {
	myPerfil,
	myProduct,
	myBuys,
	editProfile,
};
