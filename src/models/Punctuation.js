const { DataTypes } = require("sequelize");

module.exports = punctuationModel = (sequelize) => {
	sequelize.define(
		"Punctuation",
		{
			id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
			},
			punctuation:{
                type: DataTypes.INTEGER,
                allowNull: false
            }
		},
		{
			paranoid: true,
		}
	);
};
