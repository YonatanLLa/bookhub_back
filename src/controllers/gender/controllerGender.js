const { Gender, Book } = require("../../db")

//me traigo todo los genero
const allGender = async () => {
   const gender = ["Acción", "Aventura", "Ciencia Ficción", "Misterio", "Suspenso", "Romance", "Terror"];
   gender.forEach((element)=>{
   // console.log(element)
       Gender.findOrCreate({
        where: {name: element}
       })
   }) 
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
         await Book.update({ AuthorId: result.id }, { where: { AuthorId: result.id } });
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