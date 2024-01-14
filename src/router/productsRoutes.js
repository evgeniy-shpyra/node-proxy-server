import { getProduct } from "../services/productServices.js"

const readRoute = ({payload, query, authHeader}) => {
    const response = getProduct()
    return response
}

export const productsRoutes = new Map ([
    ["read", readRoute]
])