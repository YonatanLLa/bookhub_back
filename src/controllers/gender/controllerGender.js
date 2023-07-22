const { Gender } = require("../../db")

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

module.exports = allGender;