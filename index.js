const server = require("./src/app");

const { sequelize } = require("./src/db");

const PORT = process.env.PORT || 3001;


 sequelize.sync({ force: false }).then(() => {
 	server.listen(PORT, () => {
		console.log(`Listen at ${PORT}`);
 	});
 });
