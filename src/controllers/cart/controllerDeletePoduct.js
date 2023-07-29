const { Buy, Book }= require("../../db");

const deleteProduct = async(cartId, productId) => {
    try {

        const cart = await Buy.findAll({
            where: { UserId: cartId },
            include: Book
        });

        if (!cart) {
            throw new Error("El carrito está vacío");
        };

        const product = await Book.findByPk(productId);

        if (!product) {
            throw new Error("El libro no fue encontrado");
        };

        const hasProduct = await cart.hasProduct(product);

        if (!hasProduct) {
        throw new Error("El libro no está en el carrito");
        };

        await cart.removeProduct(product);

        return `El libro fue removido del carrito`;

    } catch(error) {
        throw error;
    };
};

module.exports = {
    deleteProduct
};