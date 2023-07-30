const { Comment, Book, User } = require("../../db")

const getAllMyComment = async (id) => {
    const response = await Comment.findAll({
        where: { UserId: id },
        attributes: ["id", "name", "comment"]
    });
    return response;
};

const getAllReviews = async (id) => {
    const response = await Comment.findAll({
        where: { BookId: id },
        attributes: ["id", "name", "comment"]
    });
    return response;
};

const createReviews = async (id, comment, userId) => {
    const book = await Book.findByPk(id)
    const user = await User.findByPk(userId)
    const name = user.name
    if (!book) {
        return "Error"
    }
    const comentario = await Comment.create({ name, comment, UserId: userId })
    await comentario.setBook(id)
    return comentario;
}

module.exports = {
    getAllReviews,
    createReviews,
    getAllMyComment
}