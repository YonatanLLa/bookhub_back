const { Op } = require('sequelize');
const { Book, Author, Gender } = require("../../db")

const filter = async (filters) => {
  const whereClause = {};
  //console.log(filters)

  if (filters.search) {
    whereClause.name = {
        [Op.like]: `%${filters.search}%`,
      };
  }

  // Buscar libros por precio [1000, 5000]
  if(filters.price){
    whereClause.price = {
      [Op.between]: JSON.parse(filters.price.replace(/'/g, '"')),
    };
  }

  // Buscar libros con fecha de Lanzamiento
  if(filters.releaseDate){
    whereClause.releaseDate = {
      [Op.between]: JSON.parse(filters.releaseDate.replace(/'/g, '"')),
    };
  }

  // Si se proporciona el nombre del autor, buscamos el ID del autor para la consulta
  if (filters.author) {
    const author = await Author.findOne({ where: { name: filters.author } });
    if (author) {
        whereClause.AuthorId = author.dataValues.id;
        console.log("--<",whereClause)
    }
  }

  // Si se proporciona el género del libro, buscamos el ID del género para la consulta
  if (filters.gender) {
    const gender = await Gender.findOne({ where: { name: filters.gender } });
    if (gender) {
        console.log(gender.dataValues)
      whereClause.GenderId = gender.dataValues.id;
    }
  }

  const result = await Book.findAll({ where: whereClause, include: [Author, Gender] });
   return result;
}

module.exports = filter;