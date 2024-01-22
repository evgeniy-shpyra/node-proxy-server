import { getUserRepo } from "../db/index.js"
import { getHash } from "../utils/hash.js"


export const registration = async (payload) => {
    const userRepository = getUserRepo()

    const password = payload.password
    const login = payload.login
    const nickName = payload.nickName

    if(!password || !login || !nickName){
        throw new Error("Bad request") 
    }
   
    const passwordHash = getHash(password + login)

    await userRepository.create({password: passwordHash, login, nickName}) 
} 

export const login = async (payload) => {
    const userRepository = getUserRepo()

    const password = payload.password
    const login = payload.login

    if(!password || !login){
        throw new Error("Bad request")
    }

    const passwordHash = getHash(password + login)

    const res = await userRepository.loginUser({password: passwordHash, login})

    if(!res)
        throw new Error("Incorrect login or password")
   
    return res
}