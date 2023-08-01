const { Punctuation, Book } = require("../../db");
const { Sequelize } = require("sequelize")

const allMyPuntuation = async (id) => {
    const punctuations = await Punctuation.findAll({
        where: { UserId: id }
    });
    return punctuations;
}

const topPuntuation = async () => {
     // Obtener el libro con la puntuación más alta y el promedio de puntuaciones
     const highestPunctuation = await Punctuation.findOne({
        attributes: [
          "BookId",
          [Sequelize.literal("MAX(punctuation)"), "max_punctuation"],
          [Sequelize.literal("AVG(punctuation)"), "avg_punctuation"],
        ],
        group: ["BookId"],
        order: [[Sequelize.literal("max_punctuation"), "DESC"]],
      });
  
      // Obtener los detalles del libro con la puntuación más alta
      const highestPunctuationBook = await Book.findByPk(highestPunctuation.BookId, {
        include: { model: Punctuation },
      });
  
      // Obtener los detalles de los siguientes 9 libros con mayor puntuación
      const otherPunctuations = await Punctuation.findAll({
        where: {
          BookId: { [Sequelize.Op.not]: highestPunctuation.BookId },
        },
        attributes: ["BookId", [Sequelize.literal("MAX(punctuation)"), "max_punctuation"]],
        group: ["BookId"],
        order: [[Sequelize.literal("max_punctuation"), "DESC"]],
        limit: 9,
      });
  
      const otherBookIds = otherPunctuations.map((punctuation) => punctuation.BookId);
      const otherBooks = await Book.findAll({
        where: { id: otherBookIds },
        include: { model: Punctuation },
      });
  
      // Combinar el libro con la puntuación más alta y los siguientes 9 libros con mayor puntuación
      const topBooks = [highestPunctuationBook, ...otherBooks];
  
      return topBooks;
}

const idByPuntuation = async (id) => {
    const punctuations = await Punctuation.findAll({
        where: { BookId: id }
    });

    // Calculamos el promedio de puntuaciones
    let sum = 0;
    for (const punctuation of punctuations) {
        sum += punctuation.punctuation;
    }
    const averagePunctuation = sum / punctuations.length;

    // Redondeamos el promedio a un decimal y convertimos nuevamente a número
    const roundedAveragePunctuation = Number(averagePunctuation.toFixed(1));

    return roundedAveragePunctuation;
}

const createPuntuation = async (id, punctuation, userId) => {
    const response = Punctuation.create({ punctuation, BookId: id, UserId: userId })
    return response;
}

module.exports = {
    idByPuntuation,
    createPuntuation,
    allMyPuntuation,
    topPuntuation
}