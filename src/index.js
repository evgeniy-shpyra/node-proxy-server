import Fastify from "fastify"

import { combineRoutes, getRoute } from "./router/index.js"
import { parseRequest } from "./utils/parseRequest.js"
import responseWrapper from "./utils/responseWrapper.js"
import DB from "./db/index.js"

// env
const PORT = 3000

const fastify = Fastify({
    logger: false,
})

let closeDB = null

fastify.post("/*", async function (request, reply) {
    try {
        const { authHeader, method, serviceName, query, payload } =
            parseRequest(request)

        const route = getRoute({ method, serviceName })
        const response = await route({ query, payload, authHeader })
        
        reply.code(200).send(responseWrapper(null, response))
    } catch (error) {
        reply.code(500).send(responseWrapper(error.message))
    }
})

const onStartServer = async (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    closeDB = await DB()
    combineRoutes()
    console.log(`Server has been started on port: ${PORT}`)
}

fastify.listen({ port: PORT }, await onStartServer)

process.on("SIGINT", () => {
    if (closeDB) closeDB()
    fastify.close()

})
