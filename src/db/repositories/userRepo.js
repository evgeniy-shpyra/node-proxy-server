const repo = (sequelize) => ({
    create: async (payload) => {
        await sequelize.models.User.create({ payload, isOnline: false })
    },
    getUser: async (payload) => {
        const { password, login } = payload
        const foundedUser = await sequelize.models.User.findAll({
            where: {
                password,
                login
            }
        })

   
        return foundedUser
    },
})

export default repo
