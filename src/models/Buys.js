const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("Buy", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    totalPrice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
  },{
    paranoid: true,
  });
}