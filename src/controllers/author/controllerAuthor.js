const { Author } = require("../../db")

//me traigo todos los autores
const allAuthor = async () => {
   const author = ["Suzanne Collins", "Stephen King", "Richard Matheson", "Lian Tanner", "Marta Escudero", "Richard Morgan"]
   author.forEach((element)=>{
   // console.log(element)
    Author.findOrCreate({
        where: {name: element}
      })
   })
   const response = await Author.findAll()
   return response;
}

module.exports = allAuthor;