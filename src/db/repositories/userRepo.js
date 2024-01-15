const repo = (sequelize) => ({
    create: async (payload) => {
        
        await sequelize.models.User.create({ ...payload, isOnline: false })
    },
    loginUser: async (payload) => {
        const { password, login } = payload
        const foundedUser = await sequelize.models.User.findOne({
            where: {
                password,
                login
            }
        })

        if(foundedUser){
            await sequelize.models.User.update({isOnline: true}, {
                where: {
                    id: foundedUser.id
                } 
            })
        }
   
        return foundedUser
    },
    getUserByHash: async (hash) => {

        const foundedUser = await sequelize.models.User.findOne({
            where: {
                password: hash
            }
        })

        return foundedUser
    }
})

export default repo
 