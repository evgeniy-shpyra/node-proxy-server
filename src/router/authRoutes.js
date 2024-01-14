const read = ({payload, query, authHeader}) => {
    return {name: "auth, read", payload, query, authHeader}
}

const create = ({payload, query, authHeader}) => {
    return {name: "auth, create", payload, query, authHeader}
}

export const authRoutes = new Map([
    ["read", read],
    ["create", create],
])