// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
// We need id, product_name, price, stock, category_id,sequelize at the end, no timestamps, freeze table true, model:name is product.
Product.init(
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,

    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // DECIMAL (12,2) so we can store 10 digits and 2 digits after the decimal. We need to add a validator to see if it is a decimal
    price: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      validate: { isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: { isNumeric: true,},
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references to category model and its key id
      references: { 
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
