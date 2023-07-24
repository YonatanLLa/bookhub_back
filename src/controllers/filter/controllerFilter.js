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
  //console.log("filter",typeof filters.price)
  if (filters.price) {
    const priceArray = filters.price.split(',').map(Number);
    if (priceArray.length === 2) {
      const sortedPrice = priceArray.sort((a, b) => a - b);
      console.log(sortedPrice);
      whereClause.price = {
        [Op.between]: priceArray,
      };
    }
  }

  // Buscar libros con fecha de Lanzamiento
  //console.log("fecha",filters.releaseDate)
  if (filters.releaseDate) {
    const [startDate, endDate] = filters.releaseDate.split(',');
  
    whereClause.releaseDate = {
      [Op.between]: [startDate.trim(), endDate.trim()],
    };
  }

  // Si se proporciona el nombre del autor, buscamos el ID del autor para la consulta
  if (filters.author) {
    const author = await Author.findOne({ where: { name: filters.author } });
    if (author) {
        whereClause.AuthorId = author.dataValues.id;
        //console.log("--<",whereClause)
    }
  }

  // Si se proporciona el género del libro, buscamos el ID del género para la consulta
  if (filters.gender) {
    const gender = await Gender.findOne({ where: { name: filters.gender } });
    if (gender) {
        //console.log(gender.dataValues)
      whereClause.GenderId = gender.dataValues.id;
    }
  }

  const result = await Book.findAll({ where: whereClause, include: [Author, Gender] });
   return result;
}

module.exports = filter;