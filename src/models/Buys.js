const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define(
		"Buy",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			totalPrice: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "El precio total es requerido.",
					},
					isPositive(value){
            if (value <= 0) {
              throw new Error("El precio total debe ser positivo.");
            }
          }
				},
			},
			purchaseDate: {
				type: DataTypes.DATE,
				allowNull: false,
        validate: {
          notNull: {
            msg: "La fecha de compra es requerida.",
          },
          isDate: {
            msg: "La fecha de compra debe ser una fecha válida.",
          }
        }
			},
		},
		{
			paranoid: true,
		}
	);
}