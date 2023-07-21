const { getAllBook } = require("../../controllers/book/controllerBook")

const getBookById = async (req, res) => {
    try {

        const { id } = req.params;

        let totalBooks = await getAllBook();

        if (id) {
            let bookId = await totalBooks.filter((book) => book.id === id.toUpperCase());

            if (bookId.length) {
                res.status(200).send(bookId);

            } else {
                throw new Error("Book not found");
            }
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = {
    getBookById
};