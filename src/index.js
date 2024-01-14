import Fastify from "fastify"

import { combineRoutes, getRoute } from "./router/index.js"
import { parseRequest } from "./utils/parseRequest.js"
import responseWrapper from "./utils/responseWrapper.js"

// env
const PORT = 3000

const fastify = Fastify({
    logger: false,
})


fastify.post("/*", function (request, reply) {
    try{
        const {authHeader, method, serviceName, query, payload} = parseRequest(request)

        const route = getRoute({method, serviceName})
        const response = route({query, payload, authHeader})

        reply.code(200).send(responseWrapper(null, response))
    }catch(error){
        reply.code(500).send(responseWrapper(error.message))
    }
})

fastify.listen({ port: PORT }, function (err, address) {
    combineRoutes()
    console.log(`Server has been started on port: ${PORT}`)
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
