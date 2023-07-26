const { DataTypes } = require("sequelize")

module.exports = buyModel = (sequelize) => {
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
				allowNull: true,
				validate: {
					isPositive(value){
            if (value <= 0) {
              throw new Error("El precio total debe ser positivo.");
            }
          }
				},
			},
			purchaseDate: {
				type: DataTypes.DATE,
				allowNull: true,
        validate: {
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