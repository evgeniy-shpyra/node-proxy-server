const read = ({payload, query, authHeader}) => {
    return {name: "product, read", payload, query, authHeader}
}

export const productsRoutes = new Map ([
    ["read", read]
])