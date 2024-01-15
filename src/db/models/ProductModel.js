import { DataTypes } from 'sequelize' 

const Product = (sequelize) => {
    return sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        externalId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        json: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });
}

export default Product