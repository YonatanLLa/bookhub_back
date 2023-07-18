const { Gender } = require("../../db")

//me traigo todo los genero
const allGender = async () => {
   const gender = ["Accion", "Aventura", "ciencia ficción", "misterio", "Suspenso", "Romance", "Terror"];
   gender.forEach((element)=>{
   // console.log(element)
       Gender.findOrCreate({
        where: {name: element}
       })
   }) 
   const response = await Gender.findAll();
   return response;
}

module.exports = allGender;