import { DataTypes } from 'sequelize' 

const User = (sequelize) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nickName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}

export default User