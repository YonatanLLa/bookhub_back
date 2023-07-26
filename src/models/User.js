const { DataTypes } = require("sequelize");

module.exports = userModel = (sequelize) => {
  sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 25],
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 25],
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			passwordKey: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			ban: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			admin: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			googleId: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			paranoid: true,
		}
	);
};