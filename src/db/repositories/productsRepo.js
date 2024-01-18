import { Op } from "sequelize"

const productRepo = (sequelize) => ({
    getOne: async (externalProductId, userId) => {
     
        const foundedProduct = await sequelize.models.Product.findOne({
            where: {
                externalId: externalProductId,
                UserId: userId
            },
        })
    
        return foundedProduct
    },
    getByQuery: async ({startId, endId, userId}) => {
        const foundedProduct = await sequelize.models.Product.findAll({
            attributes: ['json', 'externalId'],
            where: {
                externalId: {
                    [Op.between]: [startId, endId],    
                },
                UserId: userId
            }
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
    },
    createBulk: async (payload, userId) => {
        const queryData = payload.map(product => ({json: JSON.stringify(product), UserId: userId, externalId: product.id}))
        await sequelize.models.Product.bulkCreate(queryData)
    },
})

export default productRepo