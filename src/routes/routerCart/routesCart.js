const { Router } = require('express');
const router = Router();

const { handlerGetCartById } = require("../../handlers/cart/handlerGetCartById");
const { handlerAddProductToCart } = require("../../handlers/cart/handlerPostProductToCart")
const { handlerDeleteAllProducts } = require("../../handlers/cart/handlerDeleteAllProducts")
const { handlerDeleteProduct } = require("../../handlers/cart/handlerDeleteProduct")

router.get("/:id", handlerGetCartById);
router.post("/:id/products", handlerAddProductToCart);
router.delete("/:cartId/products/", handlerDeleteAllProducts);
router.delete("/:cartId/products/:productId", handlerDeleteProduct);

module.exports = router;