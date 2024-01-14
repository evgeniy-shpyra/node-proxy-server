const responseWrapper = (errors, payload) => {
    if(errors){
        return { errors }
    }
    else {
        return payload
    }
}

export default responseWrapper