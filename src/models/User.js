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
			image: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: true,
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
			isActive: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			  },
			  vendedor: {
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