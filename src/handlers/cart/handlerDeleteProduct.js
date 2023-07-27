const { deleteProduct } = require("../../controllers/cart/controllerDeletePoduct")

const handlerDeleteProduct = async(req, res) => {
    try {

        const { cartId, productId } = req.params;
        
        const removedProduct = await deleteProduct(cartId, productId);

        res.status(200).json(removedProduct);

    } catch(error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handlerDeleteProduct
}