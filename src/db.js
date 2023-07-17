require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { 
PGDATABASE,
PGHOST,
PGPASSWORD,
PGUSER,
PGPORT } = process.env;

const sequelize = new Sequelize( `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`, {
	logging: false,
	native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];
//* esta funcion carga automaticamente los modelos al array modelDefiners
//* todos los archivos en Models tiene que empezar con mayuscula
//* hace un require a todos los archivos adentro de la carpeta Models
//* este fragmento de codigo lo saque de db.js que nos dieron en el pi

fs.readdirSync(path.join(__dirname, "/Models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/Models", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Book, Author, Gender, Buy } = sequelize.models;

//relaciones con los modelos

// relacion uno a mucho
User.hasMany(Buy);
Buy.belongsTo(User);

User.hasMany(Book, {foreignKey: 'venta_user_id',});
Book.belongsTo(User, {foreignKey: 'venta_user_id',});

Author.hasMany(Book);
Book.belongsTo(Author);

Gender.hasMany(Book);
Book.belongsTo(Gender);

// relacion mucho a mucho
Book.belongsToMany(Buy, { through: 'BookBuy' });
Buy.belongsToMany(Book, { through: 'BookBuy' });

module.exports = {
	sequelize,
	...sequelize.models,
};
