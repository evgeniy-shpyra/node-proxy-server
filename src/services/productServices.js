import { getUserRepo, getProductRepo } from "../db/index.js"

const externalApiUrl = 'https://dummyjson.com/products'

const fetchExternalProducts = async (query) => {
   
    const id = query.id ? `/${query.id}` : ''

    const response = await fetch(`${externalApiUrl}${id}`).then((response) => response.json())

    return response
} 

export const getProduct = async (payload, query, authHeader) => {
    const productRepo = getProductRepo()
    if(!authHeader){
        throw new Error("User unauthorized")
    }

    const userRepository = getUserRepo()
    const user = await userRepository.getUserByHash(authHeader)

    if(!user || user.isOnline === false){
        throw new Error("User unauthorized")
    }

    // const 

    const limit = query.limit
    const skip = query.skip
    const externalId = query.id

    let responseProducts = []

    if(externalId){
        const foundedProduct = await productRepo.getOne(externalId, user.id)
        if(foundedProduct){
            responseProducts.push(foundedProduct)
        }
        else{
            const newProducts = await fetchExternalProducts({id: externalId})
            responseProducts.push(newProducts)
           
            await productRepo.createOne(newProducts, user.id)
        }
    }
    else if(skip, limit){
        const foundedProducts = await productRepo.getByQuery({offset: skip, limit})

        

        responseProducts = foundedProducts
    }

    return responseProducts
}