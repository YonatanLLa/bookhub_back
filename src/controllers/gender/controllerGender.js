const { Gender, Book } = require("../../db")

//me traigo todo los genero
const allGender = async () => {
   const response = await Gender.findAll({
    attributes: ["name"]
 })
 const result = response.map(e =>{
    return e.name
 })
 return result;
}

//me crea el genero
const postGender = async (name) => {
   if (name) {
      const result = await Gender.create({name})
      return result;
   }
    return false
}

//me actualiza el genero
const putGender = async (name, newName) => {
      const result = await Gender.findOne({ where: {name}})
      if (result) {
         await result.update({name: newName})

         await Book.update({ GenderId: result.id }, { where: { GenderId: result.id } });

         return true
      }
      return false;
}

//me actualiza el genero
const deleteGender = async (name) => {
   const result = await Gender.destroy({ where: {name: name} })
   return result;
}

module.exports = {
   allGender,
   postGender,
   putGender,
   deleteGender
};