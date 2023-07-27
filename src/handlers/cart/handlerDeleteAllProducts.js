const { deleteAllProducts } = require("../../controllers/cart/controllerDeleteAllProducts")

const handlerDeleteAllProducts = async(req, res) => {
    try {

        const { cartId } = req.params;
        const emptyCart = await deleteAllProducts(cartId);

        res.status(200).json(emptyCart);

    } catch(error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    };
};

module.exports = {
    handlerDeleteAllProducts
};
