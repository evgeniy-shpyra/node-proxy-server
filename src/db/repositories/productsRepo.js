
const productGet = (sequelize) => (payload) => {
    // logic
    // console.log()
}

const productRepo = (sequelize) => ({
    get: productGet(sequelize)
})

export default productRepo