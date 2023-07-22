const { DataTypes } = require("sequelize");

module.exports = reviewModel = (sequelize) => {
	sequelize.define(
		"Reviews",
		{
			id: {
				type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			reviews:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            totalStore: {
                type: DataTypes.DOUBLE,
                allowNull: false
            }
		},
		{
			paranoid: true,
		}
	);
};
