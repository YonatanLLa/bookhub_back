const {
	getAllBook,
	postControllerBook,
	putControllerBook,
} = require("../../controllers/book/controllerBook");
const { Book } = require("../../db")
//trae todo los libro
// const getHandlerBook = async (req, res) => {
// 	const { name } = req.query;
// 	try {

// 		const { name } = req.query;
// 		const books = await getAllBook();
// 		if(name){
// 			const response = books.filter((e)=> e.name.toLowerCase().includes(name.toLowerCase()))
// 			if (response.length > 0) {
// 				return res.status(200).json(response);
// 			}
// 			return res.status(200).json({msg: `No encontramos el lbro con el nombre ${name}`});
// 		}
// 	 	return res.status(200).json(books);
// 	} catch (error) {
// 		res.status(500).json(error);
// 		console.log(error);
// 	}
// };
const getHandlerBook = async (req, res) => {
	const { name } = req.query;
	try {
	  const books = await getAllBook();
	  if (name) {
		const response = books.filter((e) =>
		  e.name.toLowerCase().includes(name.toLowerCase())
		);
		if (response.length > 0) {
		  return res.status(200).json(response);
		} else {
		  // Si no se encontraron libros con el nombre dado, devolvemos un array vacío
		  return res.status(200).json([]);
		}
	  }
	  return res.status(200).json(books);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({error: error.message});
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

// edita el libro por id
const putHandlerBook = async (req, res) => {
	try {
		const bookId = req.params.id;
		const {
			name,
			image,
			description,
			price,
			available,
			releaseDate,
			Gender,
			Author,
		} = req.body;
            await putControllerBook(bookId,name,image, description,price, available,releaseDate,Gender, Author)
		
		return res.status(200).json({ message: "Libro actualizado correctamente." });
		
	} catch (error) {
		console.log(error.message)
		res.status(400).json({error: error.message});	
	}
}

module.exports = {
	getHandlerBook,
	postHandlerBook,
	deleteHandlerBook,
	putHandlerBook
};
