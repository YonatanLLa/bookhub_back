const { Author, Book } = require("../../db")

//me traigo todos los autores
const allAuthor = async () => {

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

//actualiza el autor
const updateAuthor = async (name, newName) => {
   const response = await Author.findOne({ where: { name } })
   if (response) {
      await response.update({name: newName})
      await Book.update({ AuthorId: response.id }, { where: { AuthorId: response.id } });
      return true
   }
   return false;
}

//actualiza el autor
const deleteAuthor = async (name) => {
   const deletedAuthor = await User.destroy({ where: { name: name} })
   console.log(deletedAuthor)
   return deletedAuthor;
}

module.exports ={ 
   allAuthor,
   createAuthor,
   updateAuthor,
   deleteAuthor
};