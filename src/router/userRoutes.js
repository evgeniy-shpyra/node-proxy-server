import { login, registration } from "../services/userServices.js"

const login = ({payload}) => {
    const response = login(payload)
    return response
}

const create = ({payload}) => {
    const response = registration(payload)
    return response
}

export const userRoutes = new Map([
    ["login", login],
    ["create", create],
])