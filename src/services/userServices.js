import { getUserRepo } from "../db/index.js"
import { getHash } from "../utils/hash.js"


export const registration = async (payload) => {
    const userRepository = getUserRepo()

    const password = payload.password
    const login = payload.login
    const nickName = payload.nickName

    // TODO: add validation

    const passwordHash = getHash(password)

    await userRepository.create({password: passwordHash, login, nickName}) 
} 

export const login = async (payload) => {
    const userRepository = getUserRepo()

    const password = payload.password
    const login = payload.login

    const passwordHash = getHash(password)

    const res = await userRepository.getUser({password: passwordHash, login})

    if(!res.length)
        throw new Error("Incorrect login or password")
   
    return res[0]
}