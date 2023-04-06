const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

class Interests extends Model {}

Interests.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    savs: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    userId:{
      type: DataTypes.INTEGER,
      references: {
        model:"User",
        key:"id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'interest',
  }
);

module.exports = Interests;
