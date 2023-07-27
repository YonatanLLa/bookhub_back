const { addProductToCart } = require("../../controllers/cart/controllerPostProductToCart")

const handlerAddProductToCart = async(req, res) => {
    try {

        const { id } = req.params;
        const { productId } = req.body;

        const cart = await addProductToCart(id, productId);

        res.status(200).json(cart);

    } catch(error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    };
};

module.exports = {
    handlerAddProductToCart
};