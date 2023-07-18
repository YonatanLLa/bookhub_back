const { Autor } = require("../../db")
const allAuthor = async () => {
   const author = ["Suzanne Collins", "Stephen King", "Richard Matheson", "Lian Tanner", "Marta Escudero", "Richard Morgan"]
   author.forEach((element)=>{
    console.log(element)
   })
}

module.exports = allAuthor;