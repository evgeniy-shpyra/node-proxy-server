import { userRoutes } from "./userRoutes.js"
import { productsRoutes } from "./productsRoutes.js"

const combinedRoutes = new Map()

export const getRoute = ({method, serviceName}) => {
    if(!combinedRoutes.has(serviceName))
        throw new Error(`Service '${serviceName}' is not implement`)
    
    const routeFunction = combinedRoutes.get(serviceName)
    
    if(!routeFunction.has(method))
        throw new Error(`Method '${method}' is not implement`)

    const currentRoute = routeFunction.get(method)

    return currentRoute
}


export const combineRoutes = () => {
    combinedRoutes
        .set("user", userRoutes)
        .set("products", productsRoutes)
}