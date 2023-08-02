const { DataTypes, UUIDV4 } = require("sequelize")

module.exports = bookModel = (sequelize) => {
  sequelize.define("Book", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    available: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    releaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
  },{
    paranoid: true,
  });
}