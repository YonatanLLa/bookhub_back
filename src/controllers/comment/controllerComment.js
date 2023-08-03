const { Comment, Book, User } = require("../../db")

const getAllMyComment = async (id) => {
    const response = await Comment.findAll({
        where: { UserId: id },
        attributes: ["id", "name", "comment"]
    });
    console.log(response);
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