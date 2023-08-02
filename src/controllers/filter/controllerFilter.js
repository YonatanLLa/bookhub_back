const { Op } = require('sequelize');
const { Book, Author, Gender } = require("../../db")

const filter = async (filters) => {
  const whereClause = {};
  //console.log(filters)

  if (filters.search) {
    const searchQuery = `%${filters.search}%`; // No es necesario convertir a minúsculas en este caso
    whereClause.name = {
      [Op.iLike]: searchQuery,
    };
  }

  // Buscar libros por precio [1000, 5000]
  //console.log("filter",typeof filters.price)
  if (filters.price) {
    const priceArray = filters.price.split(',').map(Number);
    if (priceArray.length === 2) {
     // console.log("<--<>", priceArray);
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

   // Agregar la condición de disponibilidad (available > 0)
   whereClause.available = {
    [Op.gt]: 0,
  };

  whereClause.isActive = true

  const result = await Book.findAll({ where: whereClause, include: [Author, Gender] });
  //console.log("<--->",result)
   return result;
}

module.exports = filter;