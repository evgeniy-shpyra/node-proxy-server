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
    const UserModel = User(sequelize)
    const ProductModel = Product(sequelize)


    UserModel.hasMany(ProductModel, { onDelete: "cascade"});
    ProductModel.belongsTo(UserModel)

  
    // await sequelize.sync({ force: true})
    await sequelize.sync({ alter: true})
}


const DB = async ({password, login, name}) => { 
    const sequelize = new Sequelize(name, login, password, {
        dialect: name,
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
