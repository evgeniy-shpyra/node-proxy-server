import { getUserRepo, getProductRepo } from "../db/index.js"

const externalApiUrl = "https://dummyjson.com/products"

const fetchExternalProducts = async (query) => {
    let queryUrl = ""

    if (query.id !== undefined) {
        queryUrl += `/${query.id}`
    } else if (query.limit !== undefined && query.skip !== undefined) {
        queryUrl += `?limit=${query.limit}&skip=${query.skip}`
    }

    return await fetch(`${externalApiUrl}${queryUrl}`).then((response) =>
        response.json()
    )
}

const getMissingIntervals = (ids, startId, endId) => {
    const missingIntervals = []

    let interval = { start: null, end: null }
    for (let id = startId; id <= endId; id++) {
        const isExist = ids.includes(id)

        if (!isExist && interval.start === null) interval.start = id
        else if (isExist && interval.start !== null) {
            interval.end = id - 1
            missingIntervals.push(interval)

            interval = { start: null, end: null }
        }
    }
    if (interval.start && !interval.end) {
        interval.end = interval.start
        missingIntervals.push(interval)
    }

    return missingIntervals
}

export const getProduct = async (payload, query, authHeader) => {
    const productRepo = getProductRepo()
    if (!authHeader) {
        throw new Error("User unauthorized")
    }

    const userRepository = getUserRepo()
    const user = await userRepository.getUserByHash(authHeader)

    if (!user || user.isOnline === false) {
        throw new Error("User unauthorized")
    }

    const limit = query.limit
    const skip = query.skip
    const externalId = query.id

    //

    let responseProducts = []

    if (externalId) {
        const foundedProduct = await productRepo.getOne(externalId, user.id)
        if (foundedProduct) {
            responseProducts.push(foundedProduct)
        } else {
            const newProducts = await fetchExternalProducts({ id: externalId })
            responseProducts.push(newProducts)
            await productRepo.createOne(newProducts, user.id)
        }

    } else if (skip !== null && limit !== null) {
        const endId = skip + limit
        const startId = skip + 1
        const foundedProducts = await productRepo.getByQuery({
            startId,
            endId,
            userId: user.id,
        })

        if (foundedProducts.length !== limit) {
        
            const ids = foundedProducts.map(({ externalId }) => externalId)
            const missingIntervals = getMissingIntervals(ids, startId, endId)
       
            let newProducts = []
            for (let interval of missingIntervals) {
                const skip = interval.start - 1
                const limit = interval.end - interval.start + 1
                
                const fetchedProducts = await fetchExternalProducts({
                    skip,
                    limit,
                })
                
                newProducts.push(...fetchedProducts.products)
            }

            await productRepo.createBulk(newProducts, user.id)

            responseProducts = foundedProducts.concat(newProducts)
        } else {
            responseProducts = foundedProducts
        }
    }

    return responseProducts
}
