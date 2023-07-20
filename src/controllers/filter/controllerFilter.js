const { Op } = require('sequelize');
const { Book, Author, Gender } = require("../../db")

const filter = async (filters) => {
     // Construye las condiciones de búsqueda para Sequelize
  const whereClause = {};
  //console.log(filters)

  if (filters.search) {
    whereClause.name = {
        [Op.like]: `%${filters.search}%`,
      };
  }

  // Buscar libros por precio [1000, 5000]
  whereClause.price = {
    [Op.between]: JSON.parse(filters.price.replace(/'/g, '"')),
  };

  // Buscar libros con fechaLanzamiento entre el 1 de enero de 2019 y el 31 de diciembre de 2020
  whereClause.releaseDate = {
    [Op.between]: JSON.parse(filters.releaseDate.replace(/'/g, '"')),
  };

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

  // Realiza la consulta a la base de datos con las condiciones de búsqueda
  try {
    const result = await Book.findAll({ where: whereClause, include: [Author, Gender] });
    // El resultado contiene los libros que cumplen con los filtros combinados, y cada libro incluirá el autor y el género asociados
    return result;
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    throw error;
  }
}

module.exports = filter;