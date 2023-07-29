const { userPublishedBooks } = require("../../controllers/user/controllerUserPublishedBooks");

const handlerUserPublishedBooks = async (req, res) => {
    try {

        const { id } = req.params;
        const publishedBooks = await userPublishedBooks(id);

        res.status(200).json(publishedBooks);

    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

module.exports = {
    handlerUserPublishedBooks
};