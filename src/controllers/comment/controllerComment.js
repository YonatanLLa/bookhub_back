const { Comment, Book, User, Punctuation } = require("../../db")

const getAllMyComment = async (id) => {
    const response = await Comment.findAll({
        where: { UserId: id },
        attributes: ["id", "name", "comment"]
    });
    return response;
};

const getAllReviews = async (id) => {
    const resComment = await Comment.findAll({
        where: { BookId: id },
        attributes: ["id", "name", "comment", "UserId"]
    });
    const resPunctuation = await Punctuation.findAll({
        where: { BookId: id },
        attributes: ["id", "punctuation", "UserId"]
    });

    // Combinar comentarios y puntuaciones por UserId
    const combinedReviews = {};

    resComment.forEach((comment) => {
        if (!combinedReviews[comment.UserId]) {
            combinedReviews[comment.UserId] = {
                id: comment.id,
                name: comment.name,
                comment: comment.comment,
                punctuation: null
            };
        } else {
            combinedReviews[comment.UserId].comment = comment.comment;
        }
    });

    resPunctuation.forEach((punctuation) => {
        if (!combinedReviews[punctuation.UserId]) {
            combinedReviews[punctuation.UserId] = {
                id: null,
                name: null,
                comment: null,
                punctuation: punctuation.punctuation
            };
        } else {
            combinedReviews[punctuation.UserId].punctuation = punctuation.punctuation;
        }
    });

    // Convertir el objeto combinado en un array de reviews
    const combinedReviewsArray = Object.values(combinedReviews);

    return combinedReviewsArray;
};

const createReviews = async (id, comment, userId) => {
    const book = await Book.findByPk(id)
    const user = await User.findByPk(userId)
    console.log(book);
    console.log(user);
    const name = user.name
    const lastName = user.lastName;
    const image = user.image

    if (!book) {
        return "Error"
    }
    const comentario = await Comment.create({
			name,
			comment,
			UserId: userId,
			lastName,
			image,
		});
    await comentario.setBook(id)
    return comentario;
}

module.exports = {
    getAllReviews,
    createReviews,
    getAllMyComment
}