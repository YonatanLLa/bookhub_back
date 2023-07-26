const { DataTypes } = require("sequelize");

module.exports = buyBookModel = (sequelize) => {
  const BuyBook = sequelize.define(
    "BuyBook",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Valor predeterminado para la cantidad, puedes ajustarlo según tus necesidades
      },
    },
    {
      timestamps: false, // Desactiva la creación automática de campos de fecha
    }
  );

  return BuyBook;
};
