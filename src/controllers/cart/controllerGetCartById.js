const { Buy, BuyBook } = require("../../db");

const controllerGetCartById = async(id) => {
    try {

        const cart = await Buy.findByPk(id, {
            include: BuyBook
        });

        return cart;

    } catch(error) {
        throw error;
    }
}

module.exports = {
    controllerGetCartById
};