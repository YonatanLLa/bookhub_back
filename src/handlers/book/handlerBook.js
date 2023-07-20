const {
	getAllBook,
	postControllerBook,
} = require("../../controllers/book/controllerBook");
const { Book } = require("../../db")
//trae todo los libro
const getHandlerBook = async (req, res) => {
	try {

		const { name } = req.query;
		const books = await getAllBook();

		if (name) {

			let bookName = await books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));

			if (!bookName.length) {
				throw new Error("Book not found");
			}
			else {
				res.status(200).json(books);
			}
		}
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
};

//cargar el libro en la base de dato
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

//elimina el libro por id
const deleteHandlerBook = async (req, res) => {
	try {
		const bookId = req.params.id;

		const book = await Book.findByPk(bookId);

		if (!book) {
			return res.status(404).json({ error: 'El libro no existe.' });
		}

		await book.destroy();

		return res.status(200).json({ message: 'Libro eliminado correctamente.' });
	} catch (error) {
		console.log(error.message)
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getHandlerBook,
	postHandlerBook,
	deleteHandlerBook
};
