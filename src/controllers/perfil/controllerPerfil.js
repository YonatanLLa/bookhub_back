const { User, Book, Buy } = require("../../db")

const myPerfil = async (id) => {
   const user = await User.findByPk(id,{
    attributes: ["name", "email"]
   })
   return user;
}

const myProduct = async (id) => {
    const user = await Book.findAll({
        where: {venta_user_id: id}
    })
    return user;
}

const myBuys = async (id) => {
    console.log("id", id)
    const user = await Buy.findAll({
        where: {UserId: id}
    })
    return user;
}

module.exports = {
    myPerfil,
    myProduct,
    myBuys
}