const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
				allowNull: false,
				validate: {
					validations(value) {
                        if (value.length <  8) {
                            throw new Error("Password is required");
                        }
                        if (!/\d/.test(value)) {
                            throw new Error("Password must contain at least one number");
					    }
                    }
				},
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
		},
		{
			paranoid: true,
		}
	);
};