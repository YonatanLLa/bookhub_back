const { Punctuation } = require("../../db");

const allMyPuntuation = async (id) => {
    const punctuations = await Punctuation.findAll({
        where: { UserId: id }
    });
    return punctuations;
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
    allMyPuntuation
}