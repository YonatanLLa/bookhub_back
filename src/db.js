require("dotenv").config();
const { Sequelize } = require("sequelize");
const authorModel = require("./models/Author");
const bookModel = require("./models/Book");
const buyModel = require("./models/Buys");
const genderModel = require("./models/Gender");
const reviewModel = require("./models/Reviews");
const userModel = require("./models/User");
const buyBookModel = require("./models/BuyBook");
const ventaModel = require("./models/Venta");
// const Reviews = require("./models/Reviews");

const { PGDATABASE, PGHOST, PGPASSWORD, PGUSER, PGPORT } = process.env;

const sequelize = new Sequelize(
	`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`,
	{
		logging: false,
		native: false,
		// dialectOptions: {
		// 	ssl: {
		// 		require: true
		// 	}
		// }
	}
);

authorModel(sequelize);
bookModel(sequelize);
buyModel(sequelize);
genderModel(sequelize);
reviewModel(sequelize);
userModel(sequelize);
buyBookModel(sequelize);
ventaModel(sequelize);


const { User, Book, Author, Gender, Buy, Reviews, BuyBook, Venta } =
	sequelize.models;

//relaciones con los modelos

// relacion uno a mucho
User.hasMany(Buy);
Buy.belongsTo(User);

User.hasMany(Reviews);
Reviews.belongsTo(User);

User.hasMany(Book, { foreignKey: "venta_user_id" });
Book.belongsTo(User, { foreignKey: "venta_user_id" });

User.belongsTo(Buy, { through: "compras_usuario" });
Buy.belongsTo(User, { through: "compras_usuario" });

Author.hasMany(Book);
Book.belongsTo(Author);

Gender.hasMany(Book);
Book.belongsTo(Gender);

// relacion mucho a mucho
Buy.belongsToMany(Book, { through: BuyBook });
Book.belongsToMany(Buy, { through: BuyBook });

Book.belongsToMany(Reviews, { through: "BookReview" });
Reviews.belongsToMany(Book, { through: "BookReview" });

User.belongsTo(Venta, { through: "compras_usuario" });
Venta.belongsTo(User, { through: "compras_usuario" });

module.exports = {
	sequelize,
	...sequelize.models,
};
