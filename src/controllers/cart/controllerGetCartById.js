const { Buy, Book } = require("../../db");

const controllerGetCartById = async(id) => {
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
    controllerGetCartById
};