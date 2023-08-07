const { Comment, Book, User, Punctuation } = require("../../db")

const getAllMyComment = async (userId) => {
    const resComment = await Comment.findAll({
        where: { UserId: userId },
        attributes: ["id","name", "comment", "BookId"]
    });
    
    const resPunctuation = await Punctuation.findAll({
        where: { UserId: userId },
        attributes: ["punctuation", "BookId"]
    });

    // Obtener los IDs de los libros relacionados
    const bookIds = [...resComment.map(comment => comment.BookId), ...resPunctuation.map(punctuation => punctuation.BookId)];
    
    // Consultar los detalles de los libros basados en sus IDs
    const books = await Book.findAll({
        where: { id: bookIds },
        attributes: ["id", "name", "image"]
    });

    // Crear un objeto para almacenar los detalles de los libros
    const bookDetails = {};
    books.forEach(book => {
        bookDetails[book.id] = {
            name: book.name,
            image: book.image
        };
    });

    // Combinar comentarios, puntuaciones y detalles de los libros
    const combinedReviewsArray = [];

    resComment.forEach(comment => {
        const bookId = comment.BookId;
        combinedReviewsArray.push({
            id: bookId,
            title: bookDetails[bookId].name,
            name: comment.name,
            comment: comment.comment,
            punctuation: null,
            image: bookDetails[bookId].image
        });
    });

    resPunctuation.forEach(punctuation => {
        console.log("puj", punctuation);
        const bookId = punctuation.BookId;
        // Verificar si el libro ya se ha agregado como un comentario
        const existingReview = combinedReviewsArray.find(review => review.id === punctuation.BookId);
        console.log("exis", combinedReviewsArray);
        if (existingReview) {
            existingReview.punctuation = punctuation.punctuation;
        } else {
            combinedReviewsArray.push({
                id: null,
                title: bookDetails[bookId].name,
                name: null,
                comment: null,
                punctuation: punctuation.punctuation,
                image: bookDetails[bookId].image
            });
        }
    });

    return combinedReviewsArray;
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