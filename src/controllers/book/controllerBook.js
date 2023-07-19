const { Book, Author, Gender } = require("../../db");

const getAllBook = async () => {
	const bookAll = await Book.findAll({
		include:[ { model: Author, attributes: ["id","name"]}, {model: Gender, attributes: ["id","name"]}]
	});
	if (!bookAll) {
		throw new Error("No book found");
	}
	return bookAll;
};

const postControllerBook = async (
	name,
	image,
	description,
	price,
	available,
	releaseDate,
	GenderId,
	AuthorId
) => {
	if (!name || !image || !description || !price || !available || !releaseDate) {
		throw new Error("All fields are required");
	}
	const book = await Book.create({
		name,
		image,
		description,
		price,
		available,
		releaseDate,
	});
	await book.setGender(GenderId);
	await book.setAuthor(AuthorId);
	return book;
};
const deleteControllerBook = async (id) => {
	
};

module.exports = {
	getAllBook,
	postControllerBook,
	deleteControllerBook
};
