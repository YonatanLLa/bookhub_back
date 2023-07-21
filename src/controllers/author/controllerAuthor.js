const { Author } = require("../../db")

//me traigo todos los autores
const allAuthor = async () => {
   const author = ["Suzanne Collins", "Stephen King", "Richard Matheson", "Lian Tanner", "Marta Escudero", "Richard Morgan"]
   author.forEach((element)=>{
    Author.findOrCreate({
        where: {name: element}
      })
   })
   const response = await Author.findAll({
      attributes: ["name"]
   })
   const result = response.map(e =>{
      return e.name
   })
   return result;
}

//creo el autor
const createAuthor = async (name) => {
   const response = await Author.create({name})
   return response;
}

module.exports ={ 
   allAuthor,
   createAuthor
};