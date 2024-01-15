import { DataTypes } from 'sequelize' 

const User = (sequelize) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nickName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isOnline: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
}

export default User