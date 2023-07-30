const { Punctuation } = require("../../db");

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

    // Agregamos el promedio al resultado
    const result =  Math.ceil(averagePunctuation)

    return result;
}

const createPuntuation = async (id, punctuation, userId) => {
    const response = Punctuation.create({ punctuation, BookId: id, UserId: userId })
    return response;
}

module.exports = {
    idByPuntuation,
    createPuntuation
}