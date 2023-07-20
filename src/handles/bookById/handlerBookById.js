const { Book, Author, Gender } = require("../../db")

const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id,{
            include:[ { model: Author, attributes: ["id","name"]}, {model: Gender, attributes: ["id","name"]}]
        });

        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado.' });
        }
          return res.status(200).send(book);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
};

module.exports = {
    getBookById
};