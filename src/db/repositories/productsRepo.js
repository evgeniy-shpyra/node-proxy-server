
const productRepo = (sequelize) => ({
    getOne: async (externalProductId, userId) => {
        
        const foundedProduct = await sequelize.models.Product.findOne({
            where: {
                externalId: externalProductId,
                UserId: userId
            }
        })

        return foundedProduct
    },
    getByQuery: async (query) => {
        const foundedProduct = await sequelize.models.Product.findAll({
            ...query,
            order: [
                ['externalId', 'ASC']
            ]
        })

        return foundedProduct
    },
    createOne: async (payload, userId) => {
        const externalId = payload.id

        await sequelize.models.Product.create({
            externalId,
            json: JSON.stringify(payload),
            UserId: userId
        })
    }
})

export default productRepo