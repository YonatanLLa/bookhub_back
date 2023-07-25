const { allCarrito, createCarrito } = require("../../controllers/carrito/controlerCarrito")

//traer todo la order de pedido
const getAllcarrito = async (req, res)=> {
    try {
        const response = await allCarrito()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}

//crea la order de pedido
const postcarrito = async (req, res)=> {
    try {
        const response = await createCarrito()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllcarrito,
    postcarrito
}