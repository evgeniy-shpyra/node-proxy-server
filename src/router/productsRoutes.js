import { getProduct } from "../services/productServices.js"

const read = ({payload, query, authHeader}) => {
    const response = getProduct()
    return response
}

export const productsRoutes = new Map ([
    ["read", read]
])