
const supportedMethods = ['read', 'update', 'create', 'login']

const parseHeaders = (headers) => {
    if(!headers){
        throw new Error("Headers are not specified")
    }
    const authHeader = headers['authorization'] ? headers['authorization'] : null
    const contentTypeHeader = headers['content-type']
    
    return {authHeader, contentTypeHeader}
}

const parseUrl = (url) => {
    const urlArr = url.slice(1).split("/")

    if(urlArr.length !== 2 || !urlArr[0].length || !urlArr[1].length){
        throw new Error("Request url is not correct") 
    }

    const method = urlArr[1]
    const serviceName = urlArr[0]

    if(!supportedMethods.includes(method)){
        throw new Error("Request method is not supported")
    }

    return {method, serviceName}
}

const parseBody = ({body, method, contentTypeHeader = ''}) => {

    if(!contentTypeHeader.includes("application/json")){
        throw new Error("Content type is not implement")
    }
   
    const incorrectBodyError = "Request body is not correct"
    if(!body){
        throw new Error(incorrectBodyError)
    }

    const payload = body.body ? body.body : null
    const query = body.query

    if(!query){
        throw new Error(incorrectBodyError)
    }

    else if(!payload){
        throw new Error(incorrectBodyError)
    }

    return {query, payload}
}

export const parseRequest = ({url, body, headers}) => {
    
    const {authHeader, contentTypeHeader} = parseHeaders(headers)
    const {method, serviceName} = parseUrl(url)
    const {query, payload} = parseBody({body, method, contentTypeHeader})
    
    return {authHeader, method, serviceName, query, payload}
}
