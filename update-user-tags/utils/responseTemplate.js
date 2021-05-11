const headers = {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Headers": "*" 
}

const formErrorResponse = (message , statusCode = 501) => {
    return {
        statusCode : statusCode,
        body : message,
        headers : headers
    }
}
const formOkResponse = response => {
    return {
        statusCode : 200,
        body : JSON.stringify(response),
        headers : headers
    }
}

module.exports = {
    formErrorResponse,
    formOkResponse
}