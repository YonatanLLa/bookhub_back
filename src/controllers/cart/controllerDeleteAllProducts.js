const { Buy, Book } = require("../../db");

const deleteAllProducts = async (cartId) => {
    try {

        const cart = await Buy.findAll({
            where: { UserId: id },
            include: Book
        });

        if (!cart) {
            throw new Error("El carrito está vacío");
        };

        await cart.setProducts([]);
        await cart.update({ current_state: "Empty" });

        return "Todos los libros fueron removidos del carrito";

    } catch (error) {
        throw error;
    };
};

module.exports = {
    deleteAllProducts
};