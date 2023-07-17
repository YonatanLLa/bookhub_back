const server = require("./src/app");

// const { sequelize } = require("./src/db.js");

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Listen at ${PORT}`);
})

// sequelize.sync({ force: true }).then(() => {
// 	server.listen(PORT, () => {
// 		console.log(`Listen at ${PORT}`);
// 	});
// });
