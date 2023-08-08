const { DataTypes } = require("sequelize");

module.exports = commentModel = (sequelize) => {
	sequelize.define(
		"Comment",
		{
			id: {
				type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name:{
                type: DataTypes.STRING,
                allowNull: false
            },
			lastName:{
				type: DataTypes.STRING,
				allowNull: true
			},
			image:{
				type: DataTypes.STRING,
				allowNull: true
			},
			comment:{
                type: DataTypes.TEXT,
                allowNull: false
            }
		},
		{
			paranoid: true,
		}
	);
};
