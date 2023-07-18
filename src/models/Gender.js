const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define(
		"Gender",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 25],
				}
			},
		},
		{
			paranoid: true,
		}
	);
}