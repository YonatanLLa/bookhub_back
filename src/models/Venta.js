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
				type: DataTypes.JSONB, // Ajusta el tipo de datos según corresponda
				allowNull: true,
				get() {
					const rawValue = this.getDataValue("products");
					if (rawValue) {
						return rawValue.map((product) => ({
							...product,
							review: false, // Nueva propiedad booleana en cada producto
						}));
					}
					return [];
				},
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
