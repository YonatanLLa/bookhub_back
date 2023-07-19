const {
	getAllBook,
	postControllerBook,
} = require("../../controllers/book/controllerBook");

const getHandlerBook = async (req, res) => {
	try {
		const books = await getAllBook();
		res.status(200).json(books);
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
};
const postHandlerBook = async (req, res) => {
	const { name, image, description, price, available, releaseDate, GenderId, AuthorId } = req.body;

	const book = await postControllerBook(
		name,
		image,
		description,
		price,
		available,
		releaseDate,
		GenderId,
		AuthorId
	);
	res.status(201).json(book);
};

module.exports = {
	getHandlerBook,
	postHandlerBook,
};
