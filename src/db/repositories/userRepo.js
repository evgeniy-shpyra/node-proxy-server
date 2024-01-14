const repo = (sequelize) => ({
    create: async (payload) => {
        await sequelize.models.User.create(payload)
    },
    getUser: async (payload) => {
        const { password, login } = payload
        const res = await sequelize.models.User.findAll({
            where: {
                password,
                login
            }
        })
   
        return res
    },
})

export default repo
