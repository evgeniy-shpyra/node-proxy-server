import { login, registration } from "../services/userServices.js"

const loginRoute = ({payload}) => {
    const response = login(payload)
    return response
}

const createRoute = ({payload}) => {
    const response = registration(payload)
    return response
}

export const userRoutes = new Map([
    ["login", loginRoute],
    ["create", createRoute],
])