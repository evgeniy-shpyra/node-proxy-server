import { DataTypes } from 'sequelize' 

const Product = (sequelize) => {
    return sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
}

export default Product