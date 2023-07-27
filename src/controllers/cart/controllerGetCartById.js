const { Buy, Book } = require("../../db");

const getCartById = async(id) => {
    try {

        const cart = await Buy.findAll({
            where: { UserId: id },
            include: Book
        });

        return cart;

    } catch(error) {
        throw error;
    }
}

module.exports = {
    getCartById
};