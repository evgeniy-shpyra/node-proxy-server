import Sequelize from "sequelize"
import Product from "./models/ProductModel.js"
import User from "./models/UserModel.js"

const initModels = (sequelize) => {
    Product(sequelize)
    User(sequelize)
}

const connectionDB = async () => { 

    const sequelize = new Sequelize("postgres", "admin", "1234", {
        dialect: "postgres",
    })

    try {
        await sequelize.authenticate()

        initModels(sequelize)

        

        console.log("Connection has been established successfully.")

        return sequelize
    } catch (error) {
        console.error("Unable to connect to the database:", error)
    }
}


export default connectionDB
