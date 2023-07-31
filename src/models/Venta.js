const { DataTypes } = require("sequelize");

module.exports = ventaModel = (sequelize) => {
	sequelize.define(
		"Venta",
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			purchaseDate: {
				type: DataTypes.DATE,
				allowNull: true,
				validate: {
					isDate: {
						msg: "La fecha de compra debe ser una fecha válida.",
					},
				},
			},
			products: {
				type: DataTypes.JSONB, // Adjust the data type accordingly
				allowNull: true,
			},
			send: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			paranoid: true,
		}
	);
};
