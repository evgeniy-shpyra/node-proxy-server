import Sequelize from "sequelize"
import Product from "./models/ProductModel.js"
import User from "./models/UserModel.js"
import userRepo from "./repositories/userRepo.js"
import productRepo from "./repositories/productsRepo.js"

const repositories = {}

const initRepo = (sequelize) => {
    repositories.user = userRepo(sequelize)
    repositories.product = productRepo(sequelize)
}

const initModels = async (sequelize) => {
    Product(sequelize)
    User(sequelize)

    // init
    // await sequelize.sync({ force: true})
    await sequelize.sync({ alert: true})
}


const DB = async () => { 
    const sequelize = new Sequelize("postgres", "admin", "1234", {
        dialect: "postgres",
        logging: false
    })

    try {
        await sequelize.authenticate()

        initModels(sequelize)
        await initRepo(sequelize)

        console.log("Connection has been established successfully.")

        return () => sequelize.close()
       
    } catch (error) {
        console.error("Unable to connect to the database:", error)
    }
}


export const getUserRepo = () => repositories.user
export const getProductRepo = () => repositories.product

export default DB
