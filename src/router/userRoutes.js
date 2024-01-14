import { login, registration } from "../services/userServices.js"

const read = ({payload, query, authHeader}) => {
    const response = login()
    return response
}

const create = ({payload, query, authHeader}) => {
    const response = registration({payload})
    return response
}

export const userRoutes = new Map([
    ["read", read],
    ["create", create],
])