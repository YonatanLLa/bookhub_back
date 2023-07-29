const { User, Book } = require("../../db");

const userPublishedBooks = async (id) => {
    try {

        const publishedBooks = await User.findByPk(id, {
            include: Book
        });

        return publishedBooks;

    } catch (error) {
        throw error;
    };
};

module.exports = {
    userPublishedBooks
};