const { User, Book, Buy, Author, Gender } = require("../../db")

const myPerfil = async (id) => {
   const user = await User.findByPk(id, {
			attributes: ["name", "lastName", "image", "email"],
		});
   console.log(user);
   return user;
}

const myProduct = async (id) => {
    const user = await Book.findAll({
        where: {venta_user_id: id},    
        include:[ { model: Author, attributes: ["id","name"]}, {model: Gender, attributes: ["id","name"]}] 
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