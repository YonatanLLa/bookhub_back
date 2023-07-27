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
const putControllerBook = async (
	bookId,
	name,
	image,
	description,
	price,
	available,
	releaseDate,
	genderId,
	authorId
) => {
	
	const book = await Book.findByPk(bookId);

		if (!book) {
			return res.status(404).json({ error: "El libro no existe." });
		}
		const gender = await Gender.findOne({
			where: {name: genderId}
		})
		const author = await Author.findOne({
			where: {name: authorId}
		})
		const GenderId = gender.id
		const AuthorId = author.id
		await book.update({
			name,
			image,
			description,
			price,
			available,
			releaseDate,
			GenderId,
			AuthorId
		});
   return "listo"
};


module.exports = {
	getAllBook,
	postControllerBook,
	putControllerBook
};
